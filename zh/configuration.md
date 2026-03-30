# 配置指南

## 配置项

AutoScan 提供了以下配置项，您可以在 `application.yml` 或 `application.properties` 文件中进行配置：

| 配置项 | 类型 | 是否必填 | 描述 |
|--------|------|----------|------|
| `auto-scan.base-packages` | List<String> | 是 | 用于扫描技术基础设施、业务基础设施等的基础包路径列表。支持通配符（`*` 单级，`**` 多级） |
| `auto-scan.business-packages` | List<String> | 否 | 业务包路径列表，仅当该项目作为其他项目的基础设施时需要。支持通配符 |
| `auto-scan.dev-mode` | boolean | 否 | 开发模式，设置为 `true` 时输出详细的扫描日志，默认为根据 `spring.profiles.active` 自动检测 |
| `auto-scan.exclude-packages` | List<String> | 否 | 要排除的包路径列表（v1.1.0+） |
| `auto-scan.exclude-classes` | List<String> | 否 | 要排除的类全限定名列表（v1.1.0+） |
| `auto-scan.include-annotations` | List<String> | 否 | 要包含的注解全限定名列表（v1.1.0+） |

## 完整配置示例

### YAML 格式

```yaml
auto-scan:
  # 基础包路径（必填）
  # 支持通配符：* 单级，** 多级
  base-packages:
    - org.example.*        # 单级通配符
    - com.company.**       # 多级通配符
  
  # 业务包路径（可选）
  # 仅当该项目作为其他项目的基础设施时需要
  business-packages:
    - org.example.business
  
  # 排除包（可选）- v1.1.0+
  exclude-packages:
    - org.example.test      # 排除测试包
    - org.example.example   # 排除示例包
  
  # 排除类（可选）- v1.1.0+
  exclude-classes:
    - org.example.demo.DemoClass  # 排除特定类
  
  # 包含注解（可选）- v1.1.0+
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.example.annotation.CustomComponent  # 自定义注解
  
  # 开发模式
  # true: 输出详细的扫描日志
  # false: 静默模式
  # 默认根据 spring.profiles.active 自动检测（dev/local/test = true）
  dev-mode: true
```

### Properties 格式

```properties
# 基础包路径（必填）
auto-scan.base-packages[0]=org.example.*
auto-scan.base-packages[1]=com.company.**

# 业务包路径（可选）
auto-scan.business-packages[0]=org.example.business

# 排除包（可选）- v1.1.0+
auto-scan.exclude-packages[0]=org.example.test
auto-scan.exclude-packages[1]=org.example.example

# 排除类（可选）- v1.1.0+
auto-scan.exclude-classes[0]=org.example.demo.DemoClass

# 包含注解（可选）- v1.1.0+
auto-scan.include-annotations[0]=org.springframework.stereotype.Service
auto-scan.include-annotations[1]=org.springframework.stereotype.Controller
auto-scan.include-annotations[2]=org.example.annotation.CustomComponent

# 开发模式
auto-scan.dev-mode=true
```

## 配置说明

### base-packages

`base-packages` 是必填配置项，用于指定需要扫描的基础包路径。这些包通常包含技术基础设施、业务基础设施等通用组件。

#### 基本配置

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # 核心框架包
    - org.example.common      # 通用组件包
    - org.example.security    # 安全组件包
    - com.company.framework   # 公司框架包
```

#### 通配符配置（v1.1.0+）

支持使用通配符简化配置：

```yaml
auto-scan:
  base-packages:
    - org.example.*        # 匹配 org.example 下的所有一级包
    - com.company.**       # 匹配 com.company 下的所有包
```

**通配符说明**：
- `*` - 匹配单级包（例如 `org.example.*` 匹配 `org.example.boot`、`org.example.base` 等）
- `**` - 匹配多级包（例如 `com.company.**` 匹配 `com.company` 下的所有包）

### business-packages

`business-packages` 是可选配置项，仅当该项目作为其他项目的基础设施时需要。它用于指定需要被其他项目扫描的业务包路径。

```yaml
auto-scan:
  business-packages:
    - org.example.business    # 通用业务包
    - org.example.core        # 业务核心包
```

### exclude-packages（v1.1.0+）

`exclude-packages` 用于排除特定的包，这些包将不会被扫描。

```yaml
auto-scan:
  exclude-packages:
    - org.example.test        # 排除测试包
    - org.example.example     # 排除示例包
    - org.example.demo        # 排除演示包
```

**使用场景**：
- 排除测试代码
- 排除示例代码
- 排除临时代码
- 排除不需要的模块

### exclude-classes（v1.1.0+）

`exclude-classes` 用于排除特定的类，这些类将不会被扫描。

```yaml
auto-scan:
  exclude-classes:
    - org.example.demo.DemoClass          # 排除演示类
    - org.example.temp.TempComponent      # 排除临时组件
    - org.example.test.TestService        # 排除测试服务
```

**使用场景**：
- 排除特定的演示类
- 排除临时组件
- 排除测试组件
- 精确控制扫描范围

### include-annotations（v1.1.0+）

`include-annotations` 用于配置自定义注解进行扫描。

```yaml
auto-scan:
  include-annotations:
    # Spring 内置注解
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.springframework.stereotype.Repository
    
    # 自定义注解
    - org.example.annotation.CustomComponent
    - org.example.annotation.BusinessService
```

**使用场景**：
- 扫描自定义注解标记的组件
- 扩展扫描能力
- 实现特定的组件分类

### dev-mode

`dev-mode` 用于控制是否输出详细的扫描日志。当设置为 `true` 时，AutoScan 会输出以下信息：

- 初始化扫描器的信息
- 配置的基础包列表
- 通配符解析结果
- 排除过滤配置
- 注解过滤配置
- 最终扫描的包列表
- 成功注册的 Bean 数量

默认为根据 `spring.profiles.active` 自动检测，如果当前激活的配置文件是 `dev`、`local` 或 `test`，则自动开启开发模式。

## 配置场景

### 场景 1：技术基础设施项目

```yaml
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.common
    - org.example.security
  dev-mode: true
```

### 场景 2：业务基础设施项目

```yaml
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.framework
  business-packages:
    - org.example.business
  dev-mode: true
```

### 场景 3：使用通配符（v1.1.0+）

```yaml
auto-scan:
  base-packages:
    - org.example.*
    - com.company.**
  dev-mode: true
```

### 场景 4：排除测试代码（v1.1.0+）

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test
    - org.example.example
  dev-mode: true
```

### 场景 5：自定义注解扫描（v1.1.0+）

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.springframework.stereotype.Service
    - org.example.annotation.CustomComponent
  dev-mode: true
```

### 场景 6：组合配置（v1.1.0+）

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

## 配置最佳实践

### 1. 使用通配符简化配置

```yaml
# 不推荐：逐个列出所有包
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.common
    - org.example.security
    - org.example.framework

# 推荐：使用通配符
auto-scan:
  base-packages:
    - org.example.*
```

### 2. 排除不需要的包

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test      # 排除测试包
    - org.example.example   # 排除示例包
```

### 3. 生产环境关闭日志

```yaml
# application-prod.yml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: false  # 生产环境关闭日志
```

### 4. 开发环境开启日志

```yaml
# application-dev.yml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true  # 开发环境开启日志
```

## 配置验证

启动应用后，您可以通过以下方式验证配置是否正确：

1. **查看扫描日志**：开启 `dev-mode` 查看详细的扫描过程
2. **检查 Bean 注册**：使用 Actuator 或调试工具查看注册的 Bean
3. **验证组件注入**：确保需要的组件能够正常注入

如果配置有问题，AutoScan 会在日志中输出相应的错误信息，帮助您快速定位问题。
