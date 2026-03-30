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

### 2. 业务项目

- 只配置基础设施包
- 利用 `@SpringBootApplication` 的默认扫描
- 使用排除功能控制扫描范围（v1.1.0+）

### 3. 多层架构

- 每层独立配置
- 上层自动继承下层
- 保持配置的一致性

### 4. 开发环境

- 开启 `dev-mode: true`
- 查看扫描日志
- 及时发现问题

### 5. 生产环境

- 关闭 `dev-mode: false`
- 使用通配符简化配置
- 排除不必要的包
