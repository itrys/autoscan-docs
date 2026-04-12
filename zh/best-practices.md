# 最佳实践

## 1. 基础设施项目规划

### 技术基础设施（`org.example.boot`）

**配置建议**：

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 核心框架
    - org.example.common      # 通用工具
    - org.example.security    # 安全组件
```

**规划原则**：
- 将核心框架功能放在 `org.example.boot` 包下
- 将通用工具类放在 `org.example.common` 包下
- 将安全相关组件放在 `org.example.security` 包下
- 保持包结构清晰，便于管理和维护

### 业务基础设施（`com.company.framework`）

**配置建议**：

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 包含技术基础设施
    - com.company.core        # 业务核心
    - com.company.system      # 系统管理
```

**规划原则**：
- 包含技术基础设施的包路径
- 将业务核心功能放在 `com.company.core` 包下
- 将系统管理功能放在 `com.company.system` 包下
- 可以根据业务领域进一步细分包结构

## 2. 业务项目开发

**配置建议**：

```yaml
# 只需包含基础设施，最小化配置
auto-scan:
  base-packages:
    - org.example.boot
    - com.company.core
```

**开发原则**：
- 业务项目应专注于具体业务逻辑的实现
- 充分利用基础设施提供的能力
- 不需要配置 `business-packages`，因为 `@SpringBootApplication` 会自动扫描启动类所在的包
- 保持业务代码的模块化和可维护性

## 3. 多层基础设施架构

**架构示例**：

```
技术基础设施（org.example.boot）
    ↓
业务基础设施 A（com.company.framework）
    ↓
业务基础设施 B（com.company.platform）
    ↓
具体业务项目（com.company.project.xxx）
```

**配置原则**：
- 每一层基础设施都配置自己的 `base-packages`
- 上层基础设施应包含下层基础设施的包路径
- 业务项目应包含所有需要的基础设施包路径
- 保持配置的一致性和可追溯性

## 4. 使用通配符简化配置（v1.1.0+）

### 推荐做法

```yaml
# 推荐：使用通配符
auto-scan:
  base-packages:
    - org.example.*        # 匹配所有一级包
    - com.company.**       # 匹配所有子包
```

### 不推荐做法

```yaml
# 不推荐：逐个列出所有包
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.common
    - org.example.security
    - org.example.framework
    - org.example.system
    # ... 更多包
```

**优势**：
- 配置简洁明了
- 新增包无需修改配置
- 减少配置错误
- 提高可维护性

## 5. 排除不必要的包（v1.1.0+）

### 排除测试和示例代码

```yaml
auto-scan:
  base-packages:
    - org.example           # 扫描整个包
  exclude-packages:
    - org.example.test      # 排除测试包
    - org.example.example   # 排除示例包
    - org.example.demo      # 排除演示包
```

### 排除特定类

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-classes:
    - org.example.legacy.LegacyService      # 排除遗留服务
    - org.example.temp.TempComponent        # 排除临时组件
    - org.example.deprecated.OldRepository  # 排除废弃仓库
```

**最佳实践**：
- 排除测试代码，避免测试组件被扫描
- 排除示例和演示代码
- 排除遗留和废弃代码
- 排除临时和实验性代码

## 6. 自定义注解最佳实践（v1.1.0+）

### 创建自定义注解

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component  // 重要：必须用 @Component 注解
public @interface BusinessService {
    String value() default "";
    String domain() default "";
}
```

### 使用自定义注解

```java
@BusinessService(domain = "user")
public class UserService {
    // 业务逻辑
}

@BusinessService(domain = "order")
public class OrderService {
    // 业务逻辑
}
```

### 配置扫描

```yaml
auto-scan:
  base-packages:
    - com.company
  include-annotations:
    - org.springframework.stereotype.Service
    - com.company.annotation.BusinessService
```

**最佳实践**：
- 自定义注解必须用 `@Component` 注解
- 为自定义注解添加有意义的属性
- 使用自定义注解进行组件分类
- 保持注解的单一职责

## 7. 组合使用新特性（v1.3.0+）

### 完整配置示例

```yaml
auto-scan:
  # 启用开关
  enabled: true
  
  # 通配符支持
  base-packages:
    - org.example.*           # 单级通配符
    - com.company.**          # 多级通配符
  
  # 排除支持
  exclude-packages:
    - org.example.test        # 排除测试包
    - org.example.example     # 排除示例包
  exclude-classes:
    - org.example.demo.DemoClass  # 排除特定类
  
  # 正则表达式过滤（v1.3.0+）
  exclude-packages-regex:
    - org\.example\.test\..*  # 排除所有测试包
    - org\.example\.example\..*  # 排除所有示例包
    - .*\.temp\..*  # 排除临时包
  include-packages-regex:
    - org\.example\.boot\..*  # 包含启动包
    - org\.example\.business\..*  # 包含业务包
  
  # 自定义注解支持
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - com.company.annotation.BusinessService
  
  # @Import 兼容性
  imports:
    - org.example.config.AppConfig
    - org.example.config.WebConfig
  
  # 懒加载初始化
  lazy-initialization: true
  lazy-packages:
    - org.example.service
  lazy-classes:
    - org.example.controller.UserController
  
  # 开发模式
  dev-mode: true
```

### 配置优先级

1. **启用状态检查** - 检查是否启用 AutoScan
2. **通配符解析** - 解析通配符为具体包路径
3. **排除过滤** - 应用包和类级别的排除
4. **正则表达式过滤** - 应用基于正则表达式的排除和包含（v1.3.0+）
5. **注解过滤** - 应用注解级别的过滤
6. **扫描执行** - 执行最终的扫描
7. **@Import 处理** - 处理直接导入的类
8. **懒加载处理** - 处理 Bean 的懒加载

## 8. 包命名规范

**建议的包命名规范**：

- **技术基础设施**：`org.example.boot.*`
- **业务基础设施**：`com.company.framework.*`
- **具体业务项目**：`com.company.project.*`

**包结构示例**：

```
org.example.boot
├── core            # 核心功能
├── common          # 通用工具
├── security        # 安全组件
└── config          # 配置管理

com.company.framework
├── core            # 业务核心
├── system          # 系统管理
├── user            # 用户管理
└── order           # 订单管理

com.company.project
├── user-service    # 用户服务
├── order-service   # 订单服务
└── payment-service # 支付服务
```

## 9. 开发模式使用

**开发模式配置**：

```yaml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true  # 开发模式，输出详细日志
```

**开发建议**：
- 在开发环境中开启 `dev-mode`，便于调试和问题排查
- 查看控制台输出的扫描日志，确认扫描是否正常
- 在生产环境中可以关闭 `dev-mode`，减少日志输出
- 利用扫描日志分析扫描性能和优化配置

## 10. 问题排查技巧

**常见问题及解决方案**：

### 组件未被扫描

1. 检查 `auto-scan.base-packages` 配置是否正确
2. 确认组件是否使用了 `@Component`、`@Configuration` 或其他配置的注解
3. 开启 `dev-mode` 查看扫描日志
4. 检查包路径是否包含不支持的通配符模式（v1.1.0+ 支持 `*` 和 `**`）
5. 检查是否被排除配置过滤掉了

### 扫描性能问题

1. 只配置必要的包路径，避免过度扫描
2. 使用通配符简化配置（v1.1.0+）
3. 使用排除功能减少扫描范围（v1.1.0+）
4. 合理规划包结构，减少扫描范围
5. 利用 Spring 的缓存机制，避免重复扫描

### 依赖冲突

1. 确保基础设施版本一致
2. 避免在不同层重复配置相同的包
3. 使用依赖管理工具（如 Maven BOM）统一版本
4. 检查排除配置是否正确

### 配置继承问题

1. 确保上层项目包含下层基础设施的包路径
2. 检查配置文件的加载顺序
3. 验证最终的扫描包列表是否正确
4. 使用通配符确保配置完整性（v1.1.0+）

## 11. 版本管理

**版本管理建议**：
- 使用语义化版本控制（Semantic Versioning）
- 基础设施项目的版本变更应向后兼容
- 业务项目应明确指定依赖的基础设施版本
- 定期更新基础设施版本，获取最新功能和 bug 修复

**v1.3.0 升级建议**：
- 完全向后兼容 v1.2.0
- 可以逐步采用新特性
- 建议先使用正则表达式过滤进行更灵活的包管理
- 再使用环境条件配置实现不同环境的差异化扫描
- 结合使用通配符和正则表达式，实现更精细的扫描控制

**v1.2.0 升级建议**：
- 完全向后兼容 v1.1.0
- 可以逐步采用新特性
- 建议先使用启用开关控制 AutoScan 的启用/禁用
- 再使用 @Import 兼容性导入特定配置类
- 最后使用懒加载初始化优化性能

**v1.1.0 升级建议**：
- 完全向后兼容 v1.0.0
- 可以逐步采用新特性
- 建议先使用通配符简化配置
- 再使用排除和自定义注解功能

## 12. 文档和示例

**文档建议**：
- 为基础设施项目提供详细的文档
- 包含配置示例和使用说明
- 提供常见问题和解决方案
- 维护更新日志，记录版本变更
- 说明 v1.3.0 新特性的使用方法
- 说明 v1.2.0 新特性的使用方法
- 说明 v1.1.0 新特性的使用方法

**示例建议**：
- 提供完整的示例项目
- 包含不同场景的配置示例
- 展示最佳实践和常见用法
- 提供集成测试和单元测试
- 展示 v1.3.0 新特性的使用示例
- 展示 v1.2.0 新特性的使用示例
- 展示 v1.1.0 新特性的使用示例

## 13. 性能优化建议

### 扫描范围优化

```yaml
# 推荐：精确的扫描范围
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.common
  exclude-packages:
    - org.example.test

# 不推荐：过大的扫描范围
auto-scan:
  base-packages:
    - org.example.**  # 可能扫描过多不必要的包
```

### 开发模式优化

```yaml
# 开发环境
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true  # 开启日志

# 生产环境
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: false  # 关闭日志
```

### 通配符优化

```yaml
# 推荐：精确的通配符
auto-scan:
  base-packages:
    - org.example.boot.*
    - org.example.common.*

# 不推荐：过于宽泛的通配符
auto-scan:
  base-packages:
    - org.**  # 扫描范围过大
```

### 懒加载优化（v1.2.0+）

```yaml
# 推荐：针对性的懒加载
auto-scan:
  base-packages:
    - org.example
  # 全局懒加载
  lazy-initialization: true
  # 包级懒加载
  lazy-packages:
    - org.example.service
    - org.example.repository
  # 类级懒加载
  lazy-classes:
    - org.example.controller.UserController

# 不推荐：过度使用懒加载
auto-scan:
  base-packages:
    - org.example
  # 全局懒加载可能影响关键服务的启动
  lazy-initialization: true
  # 过于宽泛的包级懒加载
  lazy-packages:
    - org.example.**  # 可能包含需要立即初始化的组件
```

**懒加载最佳实践**：
- 对非关键服务使用懒加载
- 对启动时不需要的组件使用懒加载
- 对资源密集型组件使用懒加载
- 避免对核心服务使用懒加载
- 结合使用全局、包级和类级懒加载
