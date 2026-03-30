# 常见问题

## Q1: AutoScan 与 @ComponentScan 冲突吗？

**A**: 不冲突。AutoScan 在 Spring 容器启动的早期阶段执行，早于 `@ComponentScan`。两者可以共存，但建议统一使用 AutoScan 进行基础包扫描管理，这样可以保持配置的一致性和可维护性。

## Q2: 如何排除某些包不被扫描？

**A**: 从 v1.1.0 版本开始，AutoScan 支持排除扫描功能。您可以配置 `exclude-packages` 排除特定的包，配置 `exclude-classes` 排除特定的类：

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test      # 排除测试包
    - org.example.example   # 排除示例包
  exclude-classes:
    - org.example.demo.DemoClass  # 排除特定类
```

## Q3: AutoScan 支持 Spring Boot 3.x 吗？

**A**: 支持。AutoScan 1.1.0 基于 Spring Boot 3.2.0 开发，完全兼容 Spring Boot 3.x/4.x 版本。

## Q4: 如果组件无法被扫描，该怎么办？

**A**: 可以按照以下步骤排查：

1. 检查 `auto-scan.base-packages` 配置是否正确
2. 开启 `dev-mode: true` 查看扫描日志
3. 确认组件是否使用了 `@Component`、`@Configuration` 或其他配置的注解
4. 检查包路径是否包含不支持的通配符模式（v1.1.0+ 支持 `*` 和 `**` 通配符）
5. 检查是否被排除配置过滤掉了

## Q5: AutoScan 会影响应用启动性能吗？

**A**: AutoScan 对启动性能的影响很小，因为：

1. 它只扫描配置的包路径，避免了全类路径扫描
2. 扫描过程在 Spring 容器启动早期执行，不影响后续启动过程
3. Spring 会缓存扫描结果，避免重复扫描
4. 扫描范围可控，您可以只配置必要的包路径
5. 支持排除扫描，进一步减少不必要的扫描

## Q6: 如何在多模块项目中使用 AutoScan？

**A**: 在多模块项目中，您可以：

1. 在父模块中添加 AutoScan 依赖
2. 在各个子模块的配置文件中配置相应的 `base-packages`
3. 确保子模块的配置包含所有需要的基础包路径
4. 利用 AutoScan 的多层基础设施支持特性
5. 使用通配符简化配置（v1.1.0+）

## Q7: AutoScan 支持哪些注解的扫描？

**A**: AutoScan 支持扫描带有以下注解的类：

**默认支持**：
- `@Component` 及其派生注解（`@Service`、`@Controller`、`@Repository`、`@RestController`）
- `@Configuration` 和 `@Bean` 方法

**自定义支持（v1.1.0+）**：
- 通过 `include-annotations` 配置自定义注解

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.springframework.stereotype.Service
    - org.example.annotation.CustomComponent
```

## Q8: 如何验证 AutoScan 是否正常工作？

**A**: 您可以通过以下方式验证：

1. 查看控制台输出的扫描日志（开启 `dev-mode: true`）
2. 检查是否成功注入了来自基础包的组件
3. 验证业务包中的组件是否正常扫描
4. 测试应用功能是否正常
5. 使用 Spring Boot Actuator 查看 Bean 注册情况

## Q9: AutoScan 与其他 Starter 冲突吗？

**A**: AutoScan 设计为非侵入式，与其他 Starter 不会冲突。它只是在 Spring 容器启动早期执行扫描操作，不会影响其他 Starter 的功能。

## Q10: 如何升级 AutoScan 版本？

**A**: 升级 AutoScan 版本非常简单：

1. 在 `pom.xml` 文件中更新 AutoScan 的版本号
2. 检查新版本的配置变化（如果有）
3. 重新构建和部署应用

**从 v1.0.0 升级到 v1.1.0**：
- 完全向后兼容，无需修改配置
- 可以使用新特性（通配符、排除扫描、自定义注解）

## Q11: AutoScan 支持配置文件的多环境管理吗？

**A**: 是的。AutoScan 支持 Spring Boot 的多环境配置管理，您可以在不同环境的配置文件中设置不同的 `auto-scan` 配置。例如：

```yaml
# application-dev.yml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true  # 开发环境开启日志

# application-prod.yml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: false  # 生产环境关闭日志
```

## Q12: 如何在测试环境中使用 AutoScan？

**A**: 在测试环境中，您可以：

1. 在测试配置文件中设置 `auto-scan.base-packages`
2. 开启 `dev-mode: true` 查看扫描日志
3. 利用 AutoScan 的自动扫描能力，简化测试配置
4. 确保测试环境的配置与生产环境一致
5. 使用排除功能排除测试专用组件

## Q13: AutoScan 支持自定义扫描过滤器吗？

**A**: 从 v1.1.0 版本开始，AutoScan 支持自定义注解扫描：

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.example.annotation.CustomComponent
```

您也可以创建自定义注解：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component
public @interface CustomComponent {
    String value() default "";
}
```

## Q14: 如何在包路径中使用通配符？

**A**: 从 v1.1.0 版本开始，AutoScan 支持通配符：

**单级通配符 `*`**：
```yaml
auto-scan:
  base-packages:
    - org.example.*  # 匹配 org.example.boot, org.example.base 等
```

**多级通配符 `**`**：
```yaml
auto-scan:
  base-packages:
    - org.example.**  # 匹配 org.example 及其所有子包
```

**混合使用**：
```yaml
auto-scan:
  base-packages:
    - org.example.*      # 单级通配符
    - com.company.**     # 多级通配符
```

## Q15: 如何在 Spring Boot 应用中禁用 AutoScan？

**A**: 如果您需要暂时禁用 AutoScan，可以在配置文件中设置：

```yaml
auto-scan:
  base-packages: []  # 空列表，跳过扫描
```

或者直接移除 AutoScan 依赖。

## Q16: AutoScan 的未来规划是什么？

**A**: AutoScan 的未来规划包括：

**v1.2.0 计划**：
- 📦 @Import 兼容性 - 在配置中直接导入特定类
- ⚡ 懒加载初始化 - 支持懒加载 Bean 初始化

**v1.3.0 计划**：
- 🎯 高级过滤 - 基于正则表达式的包过滤
- 🔄 条件配置 - 基于环境的扫描

**长期愿景**：
- 🔌 插件系统 - 可扩展的扫描策略
- 📊 监控仪表板 - 可视化扫描分析
- 🌐 Spring Cloud 集成 - 微服务优化

## Q17: 如何创建自定义注解并使用？

**A**: 创建自定义注解的步骤：

**1. 创建自定义注解**：
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

**2. 使用自定义注解**：
```java
package com.company.service;

import com.company.annotation.CustomComponent;

@CustomComponent
public class CustomService {
    // 业务逻辑
}
```

**3. 配置扫描**：
```yaml
auto-scan:
  base-packages:
    - com.company
  include-annotations:
    - com.company.annotation.CustomComponent
```

**注意**：自定义注解必须用 `@Component` 注解，才能被 Spring 的组件扫描机制识别。

## Q18: 通配符、排除和自定义注解可以组合使用吗？

**A**: 可以！这些功能可以灵活组合使用：

```yaml
auto-scan:
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
  
  dev-mode: true
```

这种组合配置可以实现非常灵活和精确的扫描控制。
