# Use Cases

## Scenario 1: Technical Infrastructure Project

**Positioning**: Provide core framework capabilities for all business projects

**Configuration**:

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Core framework package
    - org.example.common      # Common components package
    - org.example.security    # Security components package
```

**Description**: Technical infrastructure projects typically contain the company's core framework, common utilities, security components, etc., which need to be used by all business projects. By configuring `base-packages`, all business projects depending on this project will automatically scan these packages.

## Scenario 2: Business Infrastructure Project

**Positioning**: Based on technical infrastructure, encapsulate common business capabilities

**Configuration**:

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Contains technical infrastructure
    - com.company.framework   # Business framework package
    - com.company.security    # Security components package
  # business-packages is optional, only configure when serving as infrastructure for other projects
  business-packages:
    - com.company.business    # Common business package
```

**Description**: Business infrastructure projects are typically based on technical infrastructure, encapsulating common business capabilities in specific domains, such as user management, permission control, data access, etc. When this project serves as a dependency for other projects, by configuring `business-packages`, other projects can automatically scan these business packages.

## Scenario 3: Regular Business Project (Most Common)

**Positioning**: Develop specific business based on technical/business infrastructure

**Configuration**:

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Technical infrastructure
    - com.company.framework   # Business infrastructure
```

**Description**: Regular business projects are the most common scenario, developing specific business functionality based on the company's technical and business infrastructure. In this case, there's no need to configure `business-packages` because `@SpringBootApplication` automatically scans the package where the startup class resides and its sub-packages.

## Scenario 4: Using Wildcards to Simplify Configuration (v1.1.0+)

**Positioning**: Simplify multi-package configuration, improve configuration flexibility

**Configuration**:

```yaml
auto-scan:
  base-packages:
    - org.example.*           # Matches all first-level packages under org.example
    - com.company.**          # Matches all packages under com.company
  dev-mode: true
```

**Description**: Using wildcards can greatly simplify configuration, especially when multiple packages need to be scanned. Single-level wildcard `*` matches one level of packages, multi-level wildcard `**` matches all sub-packages.

**Applicable Scenarios**:
- Multiple peer-level packages need scanning
- Package structure changes frequently
- Need to simplify configuration files

## Scenario 5: Excluding Test and Example Code (v1.1.0+)

**Positioning**: Precisely control scanning scope, avoid scanning unnecessary code

**Configuration**:

```yaml
auto-scan:
  base-packages:
    - org.example             # Scan entire org.example package
  exclude-packages:
    - org.example.test        # Exclude test package
    - org.example.example     # Exclude example package
    - org.example.demo        # Exclude demo package
  exclude-classes:
    - org.example.temp.TempComponent      # Exclude temporary component
    - org.example.legacy.LegacyService    # Exclude legacy service
  dev-mode: true
```

**Description**: Through exclude configuration, you can precisely control the scanning scope, avoiding scanning test code, example code, temporary code, and other unnecessary components.

**Applicable Scenarios**:
- Exclude test code
- Exclude example and demo code
- Exclude legacy code
- Exclude temporary components

## Scenario 6: Custom Annotation Scanning (v1.1.0+)

**Positioning**: Extend scanning capabilities, support custom component classification

**Configuration**:

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    # Spring built-in annotations
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    # Custom annotations
    - org.example.annotation.CustomComponent
    - org.example.annotation.BusinessService
  dev-mode: true
```

**Description**: By configuring custom annotations, you can extend AutoScan's scanning capabilities to support scanning components marked with custom annotations.

**Applicable Scenarios**:
- Use custom annotations for component classification
- Implement specific component marking mechanisms
- Extend Spring's component scanning capabilities

## Scenario 7: Combined Use of New Features (v1.1.0+)

**Positioning**: Fully leverage all new features of v1.1.0

**Configuration**:

```yaml
auto-scan:
  # Wildcard support
  base-packages:
    - org.example.*           # Single-level wildcard
    - com.company.**          # Multi-level wildcard
  
  # Exclude support
  exclude-packages:
    - org.example.test        # Exclude test package
    - org.example.example     # Exclude example package
  exclude-classes:
    - org.example.demo.DemoClass  # Exclude specific class
  
  # Custom annotation support
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.example.annotation.CustomComponent
  
  dev-mode: true
```

**Description**: The three new features of v1.1.0 can be flexibly combined to achieve very precise and flexible scanning control.

**Advantages**:
- Wildcards simplify configuration
- Exclusion controls scanning scope
- Custom annotations extend capabilities

## Multi-Layer Infrastructure Architecture

AutoScan supports multi-layer infrastructure architecture, for example:

```
Technical Infrastructure (org.example.boot)
    ↓
Business Infrastructure A (com.company.framework)
    ↓
Business Infrastructure B (com.company.platform)
    ↓
Specific Business Project (com.company.project.xxx)
```

**Configuration Example**:

### 1. Technical Infrastructure (`org.example.boot`)

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Core framework
    - org.example.common      # Common utilities
    - org.example.security    # Security components
```

### 2. Business Infrastructure A (`com.company.framework`)

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Contains technical infrastructure
    - com.company.core        # Business core
    - com.company.system      # System management
```

### 3. Business Infrastructure B (`com.company.platform`)

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Contains technical infrastructure
    - com.company.framework   # Contains business infrastructure A
    - com.company.platform    # Platform features
```

### 4. Specific Business Project (`com.company.project.xxx`)

```yaml
auto-scan:
  base-packages:
    - org.example.boot
    - com.company.framework
    - com.company.platform
```

**Advantages**:
- Each layer of infrastructure can independently configure its own `base-packages`
- Upper-level projects automatically inherit lower-level infrastructure configurations
- Business projects don't need to care about specific implementations of underlying infrastructure
- Maintains modularity and maintainability of code

## Real-World Cases

### Case 1: Large Enterprise Project

**Project Structure**:
```
company-boot-starter (Technical Infrastructure)
    ↓
company-business-starter (Business Infrastructure)
    ↓
project-a (Business Project A)
project-b (Business Project B)
project-c (Business Project C)
```

**Technical Infrastructure Configuration**:
```yaml
auto-scan:
  base-packages:
    - com.company.boot
    - com.company.common
    - com.company.security
```

**Business Infrastructure Configuration**:
```yaml
auto-scan:
  base-packages:
    - com.company.boot
    - com.company.business
  business-packages:
    - com.company.business
```

**Business Project Configuration**:
```yaml
auto-scan:
  base-packages:
    - com.company.boot
    - com.company.business
```

### Case 2: Microservices Architecture

**Project Structure**:
```
microservice-framework (Microservice Framework)
    ↓
user-service (User Service)
order-service (Order Service)
product-service (Product Service)
```

**Microservice Framework Configuration**:
```yaml
auto-scan:
  base-packages:
    - com.company.microservice
    - com.company.common
  exclude-packages:
    - com.company.microservice.example
  dev-mode: true
```

**Each Microservice Configuration**:
```yaml
auto-scan:
  base-packages:
    - com.company.microservice
    - com.company.common
  dev-mode: true
```

### Case 3: Multi-Module Project Using Wildcards (v1.1.0+)

**Project Structure**:
```
parent-project
├── module-a
├── module-b
├── module-c
└── module-common
```

**Configuration**:
```yaml
auto-scan:
  base-packages:
    - com.company.module.*    # Matches all modules
    - com.company.common.**   # Matches all packages in common module
  exclude-packages:
    - com.company.module.test # Exclude test module
  dev-mode: true
```

**Advantages**:
- No need to modify configuration when adding new modules
- Automatically includes all modules
- Configuration is concise and clear

## Best Practice Recommendations

### 1. Infrastructure Projects

- Use clear package naming conventions
- Configure all packages that need to be scanned
- Consider using wildcards to simplify configuration (v1.1.0+)
- Exclude test and example code (v1.1.0+)

### 2. Business Projects

- Only configure infrastructure packages
- Leverage default scanning of `@SpringBootApplication`
- Use exclude functionality to control scanning scope (v1.1.0+)

### 3. Multi-Layer Architecture

- Each layer configures independently
- Upper layers automatically inherit lower layers
- Maintain configuration consistency

### 4. Development Environment

- Enable `dev-mode: true`
- View scanning logs
- Detect issues promptly

### 5. **Production Environment**:

- Disable `dev-mode: false`
- Use wildcards to simplify configuration
- Exclude unnecessary packages
- Use regex filtering for more flexible package management (v1.3.0+)
- Use environment conditional configuration to implement environment-specific scanning (v1.3.0+)

## Scenario 8: Using Regex for Package Filtering (v1.3.0+)

**Positioning**: Use regex for more flexible package filtering, precisely control scanning scope

**Configuration**:

```yaml
auto-scan:
  base-packages:
    - org.example
  # Exclude package regex patterns
  exclude-packages-regex:
    - org\.example\.test\..*  # Exclude all test packages
    - org\.example\.example\..*  # Exclude all example packages
    - .*\.temp\..*  # Exclude packages containing "temp"
  # Include package regex patterns
  include-packages-regex:
    - org\.example\.boot\..*  # Include boot packages
    - org\.example\.business\..*  # Include business packages
    - org\.example\.controller\..*  # Include controller packages
  dev-mode: true
```

**Description**: Regex filtering provides more flexible package path matching capabilities, enabling more precise scanning control.

**Applicable Scenarios**:
- Complex package structures require more precise filtering
- Need to filter based on package name patterns
- Exclude or include packages with specific naming patterns
- Handle dynamically changing package structures

## Scenario 9: Environment-Based Conditional Scanning (v1.3.0+)

**Positioning**: Use different scanning configurations in different environments to optimize performance for each environment

**Development Environment** (`application-dev.yml`):

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

**Test Environment** (`application-test.yml`):

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

**Production Environment** (`application-prod.yml`):

```yaml
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.business
    - org.example.controller
  dev-mode: false
  exclude-packages-regex:
    - org\.example\.test\..*  # Exclude test packages
    - org\.example\.example\..*  # Exclude example packages
    - .*\.temp\..*  # Exclude temporary packages
    - .*\.demo\..*  # Exclude demo packages
```

**Description**: Environment-based conditional scanning leverages Spring Boot's multi-environment configuration mechanism to use different scanning configurations in different environments.

**Applicable Scenarios**:
- Development environment needs to include more packages for easy debugging
- Test environment needs to exclude test code
- Production environment needs to minimize scanning scope for performance
- Different environments have different scanning needs

## Scenario 10: Combined Use of v1.3.0 New Features

**Positioning**: Fully leverage all new features of v1.3.0, achieve most flexible scanning control

**Configuration**:

```yaml
auto-scan:
  # Enable switch
  enabled: true
  
  # Wildcard support
  base-packages:
    - org.example.*
    - com.company.**
  
  # Exclude support
  exclude-packages:
    - org.example.test
  exclude-classes:
    - org.example.demo.DemoClass
  
  # Regex filtering (v1.3.0+)
  exclude-packages-regex:
    - org\.example\.test\..*  # Exclude all test packages
    - org\.example\.example\..*  # Exclude all example packages
  include-packages-regex:
    - org\.example\.boot\..*  # Include boot packages
    - org\.example\.business\..*  # Include business packages
  
  # Custom annotation support
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.example.annotation.CustomComponent
  
  # @Import compatibility
  imports:
    - org.example.config.AppConfig
    - org.example.config.WebConfig
  
  # Lazy initialization
  lazy-initialization: true
  lazy-packages:
    - org.example.service
  lazy-classes:
    - org.example.controller.UserController
  
  # Development mode
  dev-mode: true
```

**Description**: The new features of v1.3.0 can be flexibly combined with previous versions' features to achieve very powerful and flexible scanning control.

**Advantages**:
- Regex filtering provides more flexible package management
- Environment conditional configuration enables environment-specific scanning
- Perfect integration with existing features
- Provides most comprehensive scanning control capabilities
