# 架构设计

## 核心组件

```
autoscan-spring-boot-starter
├── AutoScanApplicationContextInitializer
│   └── 实现 ApplicationContextInitializer 接口
│   └── 在 Spring 容器启动早期执行扫描
│   └── 支持通配符解析、排除过滤和自定义注解
│   └── 支持 @Import 兼容性和懒加载初始化
│
├── AutoScanProperties
│   └── 配置属性类
│   └── 支持 base-packages, business-packages, dev-mode
│   └── 支持 exclude-packages, exclude-classes, include-annotations
│   └── 支持 imports, lazy-initialization, lazy-packages, lazy-classes, enabled
│
└── spring.factories
    └── 注册 AutoScanApplicationContextInitializer
```

### AutoScanApplicationContextInitializer

`AutoScanApplicationContextInitializer` 是 AutoScan 的核心组件，它实现了 Spring 的 `ApplicationContextInitializer` 接口，在 Spring 容器启动的早期阶段执行扫描操作。

主要职责：
1. 读取配置文件中的 `auto-scan` 配置
2. 检查启用状态（v1.2.0+）- 如果 `enabled` 为 false，则跳过扫描
3. 解析通配符包路径（v1.1.0+）
4. 构建需要扫描的包列表
5. 应用排除过滤器（v1.1.0+）
6. 设置自定义注解过滤器（v1.1.0+）
7. 创建 `ClassPathBeanDefinitionScanner` 进行扫描
8. 注册扫描到的组件到 Spring 容器
9. 处理 @Import 兼容性（v1.2.0+）- 直接导入指定的类
10. 处理懒加载初始化（v1.2.0+）- 为指定的 Bean 设置懒加载
11. 输出扫描日志（开发模式下）

### AutoScanProperties

`AutoScanProperties` 是配置属性类，用于存储和管理 AutoScan 的配置项：

**基础配置**：
- `basePackages` - 基础包路径列表（支持通配符）
- `businessPackages` - 业务包路径列表（支持通配符）
- `devMode` - 开发模式标志

**v1.1.0 新增配置**：
- `excludePackages` - 排除的包路径列表
- `excludeClasses` - 排除的类全限定名列表
- `includeAnnotations` - 包含的注解全限定名列表

**v1.2.0 新增配置**：
- `imports` - 直接导入的类全限定名列表（类似 @Import 注解）
- `lazyInitialization` - 全局懒加载开关
- `lazyPackages` - 懒加载的包路径列表
- `lazyClasses` - 懒加载的类全限定名列表
- `enabled` - 启用或禁用 AutoScan 组件

### spring.factories

`spring.factories` 文件用于注册 `AutoScanApplicationContextInitializer`，使其在 Spring Boot 启动时自动加载：

```
org.springframework.context.ApplicationContextInitializer=
org.itrys.autoscan.context.AutoScanApplicationContextInitializer
```

## 扫描流程

### 基本流程

1. **读取配置** - 从 `application.yml` 或 `application.properties` 中读取配置项
   - `auto-scan.base-packages`
   - `auto-scan.business-packages`
   - `auto-scan.exclude-packages`（v1.1.0+）
   - `auto-scan.exclude-classes`（v1.1.0+）
   - `auto-scan.include-annotations`（v1.1.0+）
   - `auto-scan.imports`（v1.2.0+）
   - `auto-scan.lazy-initialization`（v1.2.0+）
   - `auto-scan.lazy-packages`（v1.2.0+）
   - `auto-scan.lazy-classes`（v1.2.0+）
   - `auto-scan.enabled`（v1.2.0+）

2. **检查启用状态**（v1.2.0+）- 如果 `auto-scan.enabled` 为 false，则跳过扫描

3. **解析通配符**（v1.1.0+）- 将包路径中的通配符模式解析为实际的包路径
   - `*` 单级通配符
   - `**` 多级通配符

4. **构建扫描列表** - 合并基础包和业务包，去除重复项

5. **创建扫描器** - 使用 `ClassPathBeanDefinitionScanner` 创建扫描器

6. **设置过滤器** - 为 `@Component`、`@Configuration` 和自定义注解添加过滤器（v1.1.0+）

7. **设置排除过滤器**（v1.1.0+）- 为指定的包和类添加排除过滤器

8. **执行扫描** - 扫描所有配置的包路径

9. **注册组件** - 将扫描到的组件注册到 Spring 容器

10. **处理 @Import 兼容性**（v1.2.0+）- 直接导入指定的类

11. **处理懒加载初始化**（v1.2.0+）- 为指定的 Bean 设置懒加载

### v1.2.0 增强流程

```
读取配置
    ↓
检查启用状态（新增）
    ↓
解析通配符
    ↓
构建扫描列表
    ↓
应用排除过滤器
    ↓
设置注解过滤器
    ↓
执行扫描
    ↓
注册组件
    ↓
处理 @Import 导入（新增）
    ↓
处理懒加载初始化（新增）
```

## 执行时序

AutoScan 的执行时序非常关键，它在 Spring 容器启动的早期阶段执行，早于 `@ComponentScan` 注解的处理。这样可以确保基础包中的组件在业务包扫描之前就被注册到容器中，避免依赖问题。

执行时序：
1. Spring Boot 启动
2. 加载 `spring.factories` 中的 `ApplicationContextInitializer`
3. 执行 `AutoScanApplicationContextInitializer.initialize()` 方法
4. 读取配置（包含 v1.2.0 新配置项）
5. 检查启用状态（v1.2.0+）- 如果 `enabled` 为 false，则跳过后续步骤
6. 解析通配符（v1.1.0+）
7. 应用排除和注解过滤器（v1.1.0+）
8. 执行扫描
9. 注册扫描到的组件
10. 处理 @Import 导入（v1.2.0+）- 直接导入指定的类
11. 处理懒加载初始化（v1.2.0+）- 为指定的 Bean 设置懒加载
12. 继续 Spring 容器的启动流程
13. 处理 `@ComponentScan` 注解

## 技术原理

AutoScan 的核心技术原理是利用 Spring 的 `ApplicationContextInitializer` 接口和 `ClassPathBeanDefinitionScanner` 类：

### 1. ApplicationContextInitializer

允许在 Spring 容器初始化之前进行自定义操作，是实现早期扫描的关键。

### 2. ClassPathBeanDefinitionScanner

用于扫描类路径上的组件，支持按包路径和注解类型进行过滤。

**v1.1.0 增强**：
- 支持通配符路径解析
- 支持排除过滤器
- 支持自定义注解过滤器

### 3. Binder

用于绑定配置文件中的属性到 `AutoScanProperties` 对象。

### 4. Spring Factories 机制

用于自动注册 `ApplicationContextInitializer`，无需手动配置。

### 5. 通配符解析（v1.1.0+）

使用 `PathMatchingResourcePatternResolver` 解析通配符路径：
- `*` - 匹配单级包
- `**` - 匹配多级包

### 6. 排除过滤器（v1.1.0+）

使用 `TypeFilter` 实现排除功能：
- 包级别排除
- 类级别排除

### 7. 注解过滤器（v1.1.0+）

使用 `AnnotationTypeFilter` 实现自定义注解扫描：
- 支持内置注解
- 支持自定义注解

### 8. @Import 兼容性（v1.2.0+）

使用 Spring 的 `ImportBeanDefinitionRegistrar` 机制实现：
- 直接导入指定的类
- 支持配置类、普通类等多种类型
- 与 `@Import` 注解功能等价

### 9. 懒加载初始化（v1.2.0+）

通过修改 Bean 定义的 `lazyInit` 属性实现：
- 全局懒加载：设置所有扫描到的 Bean 为懒加载
- 包级懒加载：设置指定包下的 Bean 为懒加载
- 类级懒加载：设置指定类为懒加载

### 10. 启用开关（v1.2.0+）

通过在初始化时检查 `enabled` 配置项实现：
- 当 `enabled` 为 `false` 时，跳过所有扫描和处理逻辑
- 默认为 `true`，保持向后兼容

## 设计优势

### 1. 非侵入式

- 不改变现有代码结构
- 只需添加依赖和配置
- 与现有 Spring 机制兼容

### 2. 灵活配置

- YAML/Properties 配置
- 多环境支持
- 动态配置能力

### 3. 性能优化

- 早期执行，避免冲突
- 精确扫描范围
- 缓存机制

### 4. 扩展性强（v1.1.0+）

- 通配符支持
- 排除机制
- 自定义注解

### 5. 配置灵活性（v1.2.0+）

- @Import 兼容性：支持在配置中直接导入特定类
- 懒加载初始化：优化应用启动性能和内存使用
- 启用开关：提供完全的启用/禁用控制

## 架构演进

### v1.0.0 架构

```
配置读取 → 包列表构建 → 扫描 → 注册
```

### v1.1.0 架构

```
配置读取 → 通配符解析 → 包列表构建 → 排除过滤 → 注解过滤 → 扫描 → 注册
```

**增强点**：
1. 通配符解析层
2. 排除过滤层
3. 注解过滤层

### v1.2.0 架构

```
配置读取 → 启用状态检查 → 通配符解析 → 包列表构建 → 排除过滤 → 注解过滤 → 扫描 → 注册 → @Import 处理 → 懒加载处理
```

**增强点**：
1. 启用状态检查层
2. @Import 处理层
3. 懒加载处理层

## 未来规划

### v1.3.0 计划

- 正则表达式过滤
- 条件配置

### 长期愿景

- 插件系统
- 监控仪表板
- Spring Cloud 集成
