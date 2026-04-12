# 使用场景

## 场景 1：技术基础设施项目

**定位**：为所有业务项目提供核心框架能力

**配置**：

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 核心框架包
    - org.example.common      # 通用组件包
    - org.example.security    # 安全组件包
```

**说明**：技术基础设施项目通常包含公司内部的核心框架、通用工具类、安全组件等，这些组件需要被所有业务项目使用。通过配置 `base-packages`，所有依赖该项目的业务项目都会自动扫描这些包。

## 场景 2：业务基础设施项目

**定位**：基于技术基础设施，封装通用业务能力

**配置**：

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 包含技术基础设施
    - com.company.framework   # 业务框架包
    - com.company.security    # 安全组件包
  # business-packages 是可选的，仅当作为其他项目的基础设施时配置
  business-packages:
    - com.company.business    # 通用业务包
```

**说明**：业务基础设施项目通常基于技术基础设施，封装了特定领域的通用业务能力，例如用户管理、权限控制、数据访问等。当该项目作为其他项目的依赖时，通过配置 `business-packages`，其他项目可以自动扫描这些业务包。

## 场景 3：常规业务项目（最常见）

**定位**：基于技术/业务基础设施开发具体业务

**配置**：

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 技术基础设施
    - com.company.framework   # 业务基础设施
```

**说明**：常规业务项目是最常见的场景，它们基于公司的技术和业务基础设施开发具体的业务功能。在这种情况下，不需要配置 `business-packages`，因为 `@SpringBootApplication` 会自动扫描启动类所在的包及其子包。

## 场景 4：使用通配符简化配置（v1.1.0+）

**定位**：简化多包配置，提高配置灵活性

**配置**：

```yaml
auto-scan:
  base-packages:
    - org.example.*           # 匹配 org.example 下的所有一级包
    - com.company.**          # 匹配 com.company 下的所有包
  dev-mode: true
```

**说明**：使用通配符可以大大简化配置，特别是当有多个包需要扫描时。单级通配符 `*` 匹配一级包，多级通配符 `**` 匹配所有子包。

**适用场景**：
- 多个平级包需要扫描
- 包结构经常变化
- 需要简化配置文件

## 场景 5：排除测试和示例代码（v1.1.0+）

**定位**：精确控制扫描范围，避免扫描不必要的代码

**配置**：

```yaml
auto-scan:
  base-packages:
    - org.example             # 扫描整个 org.example 包
  exclude-packages:
    - org.example.test        # 排除测试包
    - org.example.example     # 排除示例包
    - org.example.demo        # 排除演示包
  exclude-classes:
    - org.example.temp.TempComponent      # 排除临时组件
    - org.example.legacy.LegacyService    # 排除遗留服务
  dev-mode: true
```

**说明**：通过排除配置，可以精确控制扫描范围，避免扫描测试代码、示例代码、临时代码等不需要的组件。

**适用场景**：
- 排除测试代码
- 排除示例和演示代码
- 排除遗留代码
- 排除临时组件

## 场景 6：自定义注解扫描（v1.1.0+）

**定位**：扩展扫描能力，支持自定义组件分类

**配置**：

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    # Spring 内置注解
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    # 自定义注解
    - org.example.annotation.CustomComponent
    - org.example.annotation.BusinessService
  dev-mode: true
```

**说明**：通过配置自定义注解，可以扩展 AutoScan 的扫描能力，支持扫描自定义注解标记的组件。

**适用场景**：
- 使用自定义注解进行组件分类
- 实现特定的组件标记机制
- 扩展 Spring 的组件扫描能力

## 场景 7：组合使用新特性（v1.1.0+）

**定位**：充分利用 v1.1.0 的所有新特性

**配置**：

```yaml
auto-scan:
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
  
  # 自定义注解支持
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.example.annotation.CustomComponent
  
  dev-mode: true
```

**说明**：v1.1.0 的三个新特性可以灵活组合使用，实现非常精确和灵活的扫描控制。

**优势**：
- 通配符简化配置
- 排除控制扫描范围
- 自定义注解扩展能力

## 场景 8：使用 @Import 兼容性功能（v1.2.0+）

**定位**：在配置中直接导入特定类，无需修改代码

**配置**：

```yaml
auto-scan:
  base-packages:
    - org.example
  # 直接导入特定配置类
  imports:
    - org.example.config.AppConfig
    - org.example.config.WebConfig
    - org.example.config.SecurityConfig
  dev-mode: true
```

**说明**：@Import 兼容性功能允许您在配置文件中直接导入特定类，这与在代码中使用 `@Import` 注解的效果相同，但更加灵活，无需修改代码。

**适用场景**：
- 导入第三方库的配置类
- 导入特定的业务配置
- 动态控制配置类的加载
- 避免修改现有代码结构

## 场景 9：使用懒加载初始化功能（v1.2.0+）

**定位**：优化应用启动性能和内存使用

**配置**：

```yaml
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
  dev-mode: true
```

**说明**：懒加载初始化功能允许 Bean 在首次使用时才初始化，而不是在应用启动时就全部初始化，这可以显著提高应用启动性能和减少内存使用。

**适用场景**：
- 大型应用，启动时间较长
- 内存资源有限的环境
- 包含大量不常用组件的应用
- 对启动时间有严格要求的场景

## 场景 10：使用启用开关控制 AutoScan（v1.2.0+）

**定位**：完全控制 AutoScan 的启用或禁用

**配置**：

```yaml
# 启用 AutoScan
auto-scan:
  enabled: true
  base-packages:
    - org.example

# 禁用 AutoScan
auto-scan:
  enabled: false
  base-packages:
    - org.example  # 即使配置了包，也不会进行扫描
```

**说明**：启用开关功能允许您完全控制 AutoScan 的启用或禁用，这在某些场景下非常有用，例如在测试环境中临时禁用 AutoScan。

**适用场景**：
- 测试环境中临时禁用 AutoScan
- 多环境配置，根据环境决定是否启用
- 调试和排查问题时控制 AutoScan 的行为
- 与其他扫描机制配合使用时的灵活控制

## 场景 11：组合使用 v1.2.0 新特性

**定位**：充分利用 v1.2.0 的所有新特性

**配置**：

```yaml
auto-scan:
  # 启用开关
  enabled: true
  
  # 通配符支持
  base-packages:
    - org.example.*
    - com.company.**
  
  # 排除支持
  exclude-packages:
    - org.example.test
  exclude-classes:
    - org.example.demo.DemoClass
  
  # 自定义注解支持
  include-annotations:
    - org.springframework.stereotype.Service
    - org.example.annotation.CustomComponent
  
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

**说明**：v1.2.0 的新特性可以与 v1.1.0 的特性灵活组合使用，实现更加灵活和强大的扫描控制。

**优势**：
- 启用开关提供完全控制
- @Import 兼容性增强配置灵活性
- 懒加载初始化优化性能
- 与现有特性完美集成

## 多层基础设施架构

AutoScan 支持多层基础设施架构，例如：

```
技术基础设施（org.example.boot）
    ↓
业务基础设施 A（com.company.framework）
    ↓
业务基础设施 B（com.company.platform）
    ↓
具体业务项目（com.company.project.xxx）
```

**配置示例**：

### 1. 技术基础设施（`org.example.boot`）

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 核心框架
    - org.example.common      # 通用工具
    - org.example.security    # 安全组件
```

### 2. 业务基础设施 A（`com.company.framework`）

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 包含技术基础设施
    - com.company.core        # 业务核心
    - com.company.system      # 系统管理
```

### 3. 业务基础设施 B（`com.company.platform`）

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 包含技术基础设施
    - com.company.framework   # 包含业务基础设施 A
    - com.company.platform    # 平台功能
```

### 4. 具体业务项目（`com.company.project.xxx`）

```yaml
auto-scan:
  base-packages:
    - org.example.boot
    - com.company.framework
    - com.company.platform
```

**优点**：
- 每一层基础设施都可以独立配置自己的 `base-packages`
- 上层项目自动继承下层基础设施的配置
- 业务项目无需关心底层基础设施的具体实现
- 保持了代码的模块化和可维护性

## 实际案例

### 案例 1：大型企业项目

**项目结构**：
```
company-boot-starter（技术基础设施）
    ↓
company-business-starter（业务基础设施）
    ↓
project-a（业务项目 A）
project-b（业务项目 B）
project-c（业务项目 C）
```

**技术基础设施配置**：
```yaml
auto-scan:
  base-packages:
    - com.company.boot
    - com.company.common
    - com.company.security
```

**业务基础设施配置**：
```yaml
auto-scan:
  base-packages:
    - com.company.boot
    - com.company.business
  business-packages:
    - com.company.business
```

**业务项目配置**：
```yaml
auto-scan:
  base-packages:
    - com.company.boot
    - com.company.business
```

### 案例 2：微服务架构

**项目结构**：
```
microservice-framework（微服务框架）
    ↓
user-service（用户服务）
order-service（订单服务）
product-service（商品服务）
```

**微服务框架配置**：
```yaml
auto-scan:
  base-packages:
    - com.company.microservice
    - com.company.common
  exclude-packages:
    - com.company.microservice.example
  dev-mode: true
```

**各微服务配置**：
```yaml
auto-scan:
  base-packages:
    - com.company.microservice
    - com.company.common
  dev-mode: true
```

### 案例 3：使用通配符的多模块项目（v1.1.0+）

**项目结构**：
```
parent-project
├── module-a
├── module-b
├── module-c
└── module-common
```

**配置**：
```yaml
auto-scan:
  base-packages:
    - com.company.module.*    # 匹配所有模块
    - com.company.common.**   # 匹配公共模块的所有包
  exclude-packages:
    - com.company.module.test # 排除测试模块
  dev-mode: true
```

**优势**：
- 新增模块无需修改配置
- 自动包含所有模块
- 配置简洁明了

## 最佳实践建议

### 1. 基础设施项目

- 使用明确的包命名规范
- 配置所有需要被扫描的包
- 考虑使用通配符简化配置（v1.1.0+）
- 排除测试和示例代码（v1.1.0+）
- 使用 @Import 兼容性导入特定配置类（v1.2.0+）

### 2. 业务项目

- 只配置基础设施包
- 利用 `@SpringBootApplication` 的默认扫描
- 使用排除功能控制扫描范围（v1.1.0+）
- 启用懒加载初始化优化性能（v1.2.0+）

### 3. 多层架构

- 每层独立配置
- 上层自动继承下层
- 保持配置的一致性
- 合理使用懒加载减少启动时间（v1.2.0+）

### 4. 开发环境

- 开启 `dev-mode: true`
- 查看扫描日志
- 及时发现问题
- 开启启用开关确保 AutoScan 正常工作（v1.2.0+）

### 5. 生产环境

- 关闭 `dev-mode: false`
- 使用通配符简化配置
- 排除不必要的包
- 启用懒加载初始化提高性能（v1.2.0+）
- 根据需要控制启用开关（v1.2.0+）

### 6. 性能优化

- 对非关键服务使用懒加载（v1.2.0+）
- 对启动时不需要的组件使用懒加载（v1.2.0+）
- 对资源密集型组件使用懒加载（v1.2.0+）
- 避免对核心服务使用懒加载（v1.2.0+）

### 7. 配置管理

**配置管理**：

- 使用启用开关控制 AutoScan 的行为（v1.2.0+）
- 使用 @Import 兼容性导入特定配置类（v1.2.0+）
- 组合使用全局、包级和类级懒加载（v1.2.0+）
- 使用正则表达式过滤进行更灵活的包管理（v1.3.0+）
- 使用环境条件配置实现不同环境的差异化扫描（v1.3.0+）

## 场景 12：使用正则表达式进行包过滤（v1.3.0+）

**定位**：使用正则表达式进行更灵活的包过滤，精确控制扫描范围

**配置**：

```yaml
auto-scan:
  base-packages:
    - org.example
  # 排除包的正则表达式模式
  exclude-packages-regex:
    - org\.example\.test\..*  # 排除所有测试包
    - org\.example\.example\..*  # 排除所有示例包
    - .*\.temp\..*  # 排除包含 "temp" 的包
  # 包含包的正则表达式模式
  include-packages-regex:
    - org\.example\.boot\..*  # 包含启动包
    - org\.example\.business\..*  # 包含业务包
    - org\.example\.controller\..*  # 包含控制器包
  dev-mode: true
```

**说明**：正则表达式过滤提供了更灵活的包路径匹配能力，可以实现更精确的扫描控制。

**适用场景**：
- 复杂的包结构需要更精细的过滤
- 需要基于包名模式进行过滤
- 排除或包含特定命名模式的包
- 处理动态变化的包结构

## 场景 13：基于环境的条件扫描（v1.3.0+）

**定位**：在不同环境中使用不同的扫描配置，优化各环境性能

**开发环境** (`application-dev.yml`)：

```yaml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true
  include-annotations:
    - org.springframework.stereotype.Component
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.springframework.stereotype.Repository
  exclude-packages:
    - org.example.test
```

**测试环境** (`application-test.yml`)：

```yaml
auto-scan:
  base-packages:
    - org.example
  dev-mode: true
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.springframework.stereotype.Repository
  exclude-packages:
    - org.example.test
    - org.example.example
```

**生产环境** (`application-prod.yml`)：

```yaml
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.business
    - org.example.controller
  dev-mode: false
  exclude-packages-regex:
    - org\.example\.test\..*  # 排除测试包
    - org\.example\.example\..*  # 排除示例包
    - .*\.temp\..*  # 排除临时包
    - .*\.demo\..*  # 排除演示包
```

**说明**：基于环境的条件扫描利用 Spring Boot 的多环境配置机制，在不同环境中使用不同的扫描配置。

**适用场景**：
- 开发环境需要包含更多包便于调试
- 测试环境需要排除测试代码
- 生产环境需要最小化扫描范围，提高性能
- 不同环境有不同的扫描需求

## 场景 14：组合使用 v1.3.0 新特性

**定位**：充分利用 v1.3.0 的所有新特性，实现最灵活的扫描控制

**配置**：

```yaml
auto-scan:
  # 启用开关
  enabled: true
  
  # 通配符支持
  base-packages:
    - org.example.*
    - com.company.**
  
  # 排除支持
  exclude-packages:
    - org.example.test
  exclude-classes:
    - org.example.demo.DemoClass
  
  # 正则表达式过滤（v1.3.0+）
  exclude-packages-regex:
    - org\.example\.test\..*  # 排除所有测试包
    - org\.example\.example\..*  # 排除所有示例包
  include-packages-regex:
    - org\.example\.boot\..*  # 包含启动包
    - org\.example\.business\..*  # 包含业务包
  
  # 自定义注解支持
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.example.annotation.CustomComponent
  
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

**说明**：v1.3.0 的新特性可以与之前版本的特性灵活组合使用，实现非常强大和灵活的扫描控制。

**优势**：
- 正则表达式过滤提供更灵活的包管理
- 环境条件配置实现不同环境的差异化扫描
- 与现有特性完美集成
- 提供最全面的扫描控制能力
