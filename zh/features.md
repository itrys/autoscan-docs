# 核心功能

## 自动基础包扫描

AutoScan 通过实现 `ApplicationContextInitializer` 接口，在 Spring 容器启动的早期阶段自动扫描配置的基础包。这意味着您只需在基础设施项目中配置一次，所有依赖该项目的业务项目都会自动继承这些扫描配置。

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 技术基础设施
    - org.example.base        # 业务基础设施
```

## 业务包零配置

AutoScan 巧妙地利用了 `@SpringBootApplication` 的默认扫描机制，无需为业务包单独配置。当您在业务项目中使用 `@SpringBootApplication` 注解时，它会自动扫描启动类所在的包及其子包，这样业务代码就可以无缝集成。

```java
@SpringBootApplication  // 自动扫描 com.company.project 包及其子包
public class ProjectApplication {
    // ...
}
```

## 多层基础设施支持

AutoScan 支持多层基础设施架构，业务项目也可以作为其他项目的基础设施。通过配置 `business-packages`，您可以指定该项目作为基础设施时需要被扫描的业务包。

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 技术基础设施
  business-packages:
    - com.company.business  # 通用业务包
```

## 非侵入式设计

AutoScan 采用非侵入式设计，不改变现有代码结构。您不需要修改任何现有代码，只需添加依赖并进行简单配置即可使用。

## 开发者友好

AutoScan 提供详细的扫描日志，便于调试和问题排查。在开发模式下，它会输出详细的扫描过程和结果，帮助您了解哪些包被扫描、注册了多少个 Bean 等信息。

```
>>> [AutoScan] Initializing base package scanner...
>>> [AutoScan] Configured base packages: [org.example.boot, org.example.base]
>>> [AutoScan] Final packages to scan: [org.example.boot, org.example.base]
>>> [AutoScan] Successfully registered 58 bean(s) from base packages.
```

## 轻量级

AutoScan 是一个轻量级的 Starter，无额外依赖，与 Spring Boot 完美兼容。它的实现非常简洁，只包含几个核心类，不会增加项目的复杂度和依赖负担。

## 通配符包支持（v1.1.0+）

AutoScan 支持在包路径中使用通配符，简化配置并提高灵活性：

### 单级通配符 `*`

匹配一级包路径：

```yaml
auto-scan:
  base-packages:
    - org.example.*  # 匹配 org.example.boot, org.example.base 等
```

### 多级通配符 `**`

匹配所有子包：

```yaml
auto-scan:
  base-packages:
    - org.example.**  # 匹配 org.example 及其所有子包
```

### 混合使用

```yaml
auto-scan:
  base-packages:
    - org.example.*      # 单级通配符
    - com.company.**     # 多级通配符
```

## 排除扫描（v1.1.0+）

AutoScan 支持排除特定的包和类，精确控制扫描范围：

### 排除包

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test      # 排除测试包
    - org.example.example   # 排除示例包
```

### 排除类

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-classes:
    - org.example.demo.DemoClass  # 排除特定类
    - org.example.temp.TempComponent
```

### 组合使用

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test
  exclude-classes:
    - org.example.demo.DemoClass
```

## 自定义注解扫描（v1.1.0+）

AutoScan 支持配置自定义注解进行组件扫描，扩展扫描能力：

### 配置自定义注解

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - com.company.annotation.CustomComponent  # 自定义注解
```

### 创建自定义注解

```java
package com.company.annotation;

import org.springframework.stereotype.Component;
import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component  // 重要：必须用 @Component 注解
public @interface CustomComponent {
    String value() default "";
}
```

### 使用自定义注解

```java
package com.company.service;

import com.company.annotation.CustomComponent;

@CustomComponent
public class CustomService {
    // 业务逻辑
}
```

**注意**：自定义注解必须用 `@Component` 注解，才能被 Spring 的组件扫描机制识别。

## 支持的注解

AutoScan 自动扫描所有 Spring 内置的从 `@Component` 派生的注解：

| 注解 | 包名 | 描述 |
|------|------|------|
| `@Component` | `org.springframework.stereotype` | 通用组件注解 |
| `@Service` | `org.springframework.stereotype` | 服务层组件 |
| `@Repository` | `org.springframework.stereotype` | 数据访问层组件 |
| `@Controller` | `org.springframework.stereotype` | Web 控制器组件 |
| `@RestController` | `org.springframework.web.bind.annotation` | RESTful Web 控制器 |
| `@Configuration` | `org.springframework.context.annotation` | 配置类 |
| `@Bean` | `org.springframework.context.annotation` | Bean 定义方法 |

## @Import 兼容性（v1.2.0+）

AutoScan 支持在配置中直接导入特定类，与 Spring 的 `@Import` 注解功能类似，提供更灵活的配置方式：

### 配置示例

```yaml
auto-scan:
  imports:
    - org.example.config.AppConfig
    - org.example.config.WebConfig
    - org.example.config.SecurityConfig
```

### 工作原理

AutoScan 会直接将配置的类导入到 Spring 容器中，就像使用 `@Import` 注解一样。这对于需要导入特定配置类的场景非常有用，避免了在代码中使用 `@Import` 注解的必要性。

## 懒加载初始化（v1.2.0+）

AutoScan 支持 Bean 的懒加载创建，优化应用启动性能和内存使用：

### 全局懒加载

```yaml
auto-scan:
  lazy-initialization: true  # 对所有扫描的 Bean 启用懒加载
```

### 包级懒加载

```yaml
auto-scan:
  lazy-packages:
    - org.example.service  # 对特定包的 Bean 启用懒加载
    - org.example.repository
```

### 类级懒加载

```yaml
auto-scan:
  lazy-classes:
    - org.example.controller.UserController  # 对特定类启用懒加载
    - org.example.service.OrderService
```

### 组合使用

```yaml
auto-scan:
  lazy-initialization: true  # 全局懒加载
  lazy-packages:
    - org.example.service  # 额外指定包级懒加载
  lazy-classes:
    - org.example.controller.UserController  # 额外指定类级懒加载
```

## 启用开关（v1.2.0+）

AutoScan 支持完全启用或禁用组件，提供更灵活的控制：

### 启用 AutoScan

```yaml
auto-scan:
  enabled: true  # 启用 AutoScan（默认值）
  base-packages:
    - org.example
```

### 禁用 AutoScan

```yaml
auto-scan:
  enabled: false  # 禁用 AutoScan
  base-packages:
    - org.example  # 即使配置了包，也不会进行扫描
```

### 场景使用

- **开发环境**：启用 AutoScan，享受自动扫描的便利
- **生产环境**：可以根据需要禁用 AutoScan，使用手动配置的方式
- **测试环境**：可以禁用 AutoScan，使用特定的测试配置

## 高级过滤（v1.3.0+）

AutoScan 支持基于正则表达式的包过滤，提供更灵活的扫描控制：

### 基于正则表达式的排除

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages-regex:
    - org\.example\.test\..*  # 排除所有测试包
    - org\.example\.example\..*  # 排除所有示例包
    - .*\.temp\..*  # 排除包含 "temp" 的包
```

### 基于正则表达式的包含

```yaml
auto-scan:
  base-packages:
    - org.example
  include-packages-regex:
    - org\.example\.boot\..*  # 包含启动包
    - org\.example\.business\..*  # 包含业务包
    - org\.example\.controller\..*  # 包含控制器包
    - .*Service  # 包含以 "Service" 结尾的类
```

### 组合使用

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages-regex:
    - org\.example\.test\..*  # 排除测试包
  include-packages-regex:
    - org\.example\.boot\..*  # 包含启动包
    - org\.example\.business\..*  # 包含业务包
```

## 条件配置（v1.3.0+）

AutoScan 支持基于环境的扫描配置，允许在不同环境中使用不同的扫描行为：

### 开发环境

```yaml
spring:
  profiles:
    active: dev

auto-scan:
  base-packages:
    - org.example.*  # 使用通配符提高灵活性
  dev-mode: true
  include-annotations:
    - org.springframework.stereotype.Component
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.springframework.stereotype.Repository
  exclude-packages:
    - org.example.test
```

### 测试环境

```yaml
spring:
  profiles:
    active: test

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

### 生产环境

```yaml
spring:
  profiles:
    active: prod

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
