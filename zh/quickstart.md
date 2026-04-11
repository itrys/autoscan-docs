# 快速开始

## 1. 添加依赖

在 Maven 项目的 `pom.xml` 文件中添加 AutoScan 依赖：

```xml
<dependency>
    <groupId>org.itrys</groupId>
    <artifactId>autoscan-spring-boot-starter</artifactId>
    <version>1.2.0</version>
</dependency>
```

## 2. 配置基础包

在 `application.yml` 中配置需要自动扫描的基础包：

### 基本配置

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 技术基础设施
    - org.example.base        # 业务基础设施
    - com.company.framework   # 公司框架
  dev-mode: true              # 开发模式，输出详细日志
```

### 使用通配符（v1.1.0+）

```yaml
auto-scan:
  base-packages:
    - org.example.*           # 单级通配符
    - com.company.**          # 多级通配符
  dev-mode: true
```

### 排除扫描（v1.1.0+）

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test        # 排除测试包
  exclude-classes:
    - org.example.demo.DemoClass  # 排除特定类
  dev-mode: true
```

### 自定义注解（v1.1.0+）

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.springframework.stereotype.Service
    - org.example.annotation.CustomComponent  # 自定义注解
  dev-mode: true
```

### @Import 兼容性（v1.2.0+）

```yaml
auto-scan:
  base-packages:
    - org.example
  # 直接导入配置类
  imports:
    - org.example.config.AppConfig
    - org.example.config.WebConfig
  dev-mode: true
```

### 懒加载初始化（v1.2.0+）

```yaml
auto-scan:
  base-packages:
    - org.example
  # 全局懒加载
  lazy-initialization: true
  # 包级懒加载
  lazy-packages:
    - org.example.service
  # 类级懒加载
  lazy-classes:
    - org.example.controller.UserController
  dev-mode: true
```

### 启用开关（v1.2.0+）

```yaml
# 启用 AutoScan（默认）
auto-scan:
  enabled: true
  base-packages:
    - org.example
  dev-mode: true

# 禁用 AutoScan
auto-scan:
  enabled: false
  base-packages:
    - org.example  # 即使配置了包，也不会进行扫描
```

## 3. 启动应用

```java
package com.company.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // 自动扫描 com.company.project 包及其子包
public class ProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }
}
```

启动后，控制台会输出扫描日志：

```
>>> [AutoScan] Initializing base package scanner...
>>> [AutoScan] Configured base packages: [org.example.boot, org.example.base, com.company.framework]
>>> [AutoScan] Final packages to scan: [org.example.boot, org.example.base, com.company.framework]
>>> [AutoScan] Successfully registered 58 bean(s) from base packages.
```

## 4. 验证配置

启动应用后，您可以通过以下方式验证 AutoScan 是否正常工作：

1. 查看控制台输出的扫描日志
2. 检查是否成功注入了来自基础包的组件
3. 验证业务包中的组件是否正常扫描

如果一切正常，您的应用应该能够同时使用来自基础包和业务包的组件。

## 5. 从 v1.1.0 迁移

v1.2.0 完全向后兼容 v1.1.0，只需更新版本号：

```xml
<dependency>
    <groupId>org.itrys</groupId>
    <artifactId>autoscan-spring-boot-starter</artifactId>
    <version>1.2.0</version>
</dependency>
```

所有现有配置将继续工作，无需任何更改。

## 6. 新特性体验

### 通配符扫描

```yaml
auto-scan:
  base-packages:
    - org.example.*      # 匹配 org.example.boot, org.example.base 等
    - com.company.**     # 匹配 com.company 及其所有子包
```

### 排除特定包和类

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test   # 排除测试包
  exclude-classes:
    - org.example.demo.DemoClass  # 排除特定类
```

### 自定义注解扫描

```java
// 1. 创建自定义注解
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component
public @interface CustomComponent {
    String value() default "";
}

// 2. 使用自定义注解
@CustomComponent
public class CustomService {
    // 业务逻辑
}

// 3. 配置扫描
```

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.example.annotation.CustomComponent
```

### @Import 兼容性（v1.2.0+）

```yaml
auto-scan:
  imports:
    - org.example.config.AppConfig
    - org.example.config.WebConfig
    - org.example.config.SecurityConfig
```

### 懒加载初始化（v1.2.0+）

```yaml
auto-scan:
  # 全局懒加载
  lazy-initialization: true
  # 包级懒加载
  lazy-packages:
    - org.example.service
    - org.example.repository
  # 类级懒加载
  lazy-classes:
    - org.example.controller.UserController
    - org.example.service.OrderService
```

### 启用开关（v1.2.0+）

```yaml
# 启用 AutoScan
auto-scan:
  enabled: true

# 禁用 AutoScan
auto-scan:
  enabled: false
```

## 7. 常见问题

### 组件无法被扫描？

1. 检查 `auto-scan.base-packages` 配置是否正确
2. 开启 `dev-mode: true` 查看扫描日志
3. 确认组件是否使用了 `@Component`、`@Configuration` 或其他配置的注解
4. 检查包路径是否包含不支持的通配符模式（v1.1.0+ 支持 `*` 和 `**` 通配符）

### 如何使用通配符？

- `*` - 匹配单级包（例如 `org.example.*` 匹配 `org.example.boot`、`org.example.base` 等）
- `**` - 匹配多级包（例如 `com.company.**` 匹配 `com.company` 下的所有包）

### 如何排除特定包？

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test
    - org.example.example
```

### 如何配置自定义注解？

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.example.annotation.CustomComponent
```

## 8. 下一步

- 查看 [配置指南](configuration.md) 了解详细配置
- 查看 [核心功能](features.md) 了解所有特性
- 查看 [使用场景](use-cases.md) 了解最佳实践
- 查看 [常见问题](faq.md) 解决疑问
