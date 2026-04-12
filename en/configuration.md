# Configuration Guide

## Configuration Items

AutoScan provides the following configuration items that you can configure in `application.yml` or `application.properties`:

| Configuration Item | Type | Required | Description |
|-------------------|------|----------|-------------|
| `auto-scan.base-packages` | List<String> | Yes | List of base package paths for scanning technical infrastructure, business infrastructure, etc. Supports wildcards (`*` single-level, `**` multi-level) |
| `auto-scan.business-packages` | List<String> | No | List of business package paths, only needed when this project serves as infrastructure for other projects. Supports wildcards |
| `auto-scan.dev-mode` | boolean | No | Development mode, when set to `true` outputs detailed scanning logs, defaults to auto-detection based on `spring.profiles.active` |
| `auto-scan.exclude-packages` | List<String> | No | List of package paths to exclude (v1.1.0+) |
| `auto-scan.exclude-classes` | List<String> | No | List of fully qualified class names to exclude (v1.1.0+) |
| `auto-scan.include-annotations` | List<String> | No | List of fully qualified annotation names to include (v1.1.0+) |
| `auto-scan.imports` | List<String> | No | List of fully qualified class names to directly import (like @Import annotation) (v1.2.0+) |
| `auto-scan.lazy-initialization` | boolean | No | Global lazy initialization switch for all scanned beans (v1.2.0+) |
| `auto-scan.lazy-packages` | List<String> | No | List of package paths for which beans should be lazily initialized (v1.2.0+) |
| `auto-scan.lazy-classes` | List<String> | No | List of fully qualified class names for which beans should be lazily initialized (v1.2.0+) |
| `auto-scan.enabled` | boolean | No | Completely enable or disable AutoScan component, defaults to `true` (v1.2.0+) |
| `auto-scan.exclude-packages-regex` | List<String> | No | List of regex patterns for packages to exclude (v1.3.0+) |
| `auto-scan.include-packages-regex` | List<String> | No | List of regex patterns for packages to include (v1.3.0+)

## Complete Configuration Example

### YAML Format

```yaml
auto-scan:
  # Enable or disable AutoScan component (v1.2.0+)
  enabled: true  # Default value is true
  
  # Base package paths (required)
  # Supports wildcards: * single-level, ** multi-level
  base-packages:
    - org.example.*        # Single-level wildcard
    - com.company.**       # Multi-level wildcard
  
  # Business package paths (optional)
  # Only needed when this project serves as infrastructure for other projects
  business-packages:
    - org.example.business
  
  # Exclude packages (optional) - v1.1.0+
  exclude-packages:
    - org.example.test      # Exclude test package
    - org.example.example   # Exclude example package
  
  # Exclude classes (optional) - v1.1.0+
  exclude-classes:
    - org.example.demo.DemoClass  # Exclude specific class
  
  # Include annotations (optional) - v1.1.0+
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.example.annotation.CustomComponent  # Custom annotation
  
  # Direct imports (optional) - v1.2.0+
  imports:
    - org.example.config.AppConfig
    - org.example.config.WebConfig
    - org.example.config.SecurityConfig
  
  # Lazy initialization (optional) - v1.2.0+
  # Global lazy initialization
  lazy-initialization: true
  # Package-level lazy initialization
  lazy-packages:
    - org.example.service
    - org.example.repository
  # Class-level lazy initialization
  lazy-classes:
    - org.example.controller.UserController
    - org.example.service.OrderService
  
  # Regex-based package filtering (optional) - v1.3.0+
  # Exclude packages using regex patterns
  exclude-packages-regex:
    - org\.example\.test\..*  # Exclude all test packages
    - org\.example\.example\..*  # Exclude all example packages
    - .*\.temp\..*  # Exclude packages containing "temp"
  # Include packages using regex patterns
  include-packages-regex:
    - org\.example\.boot\..*  # Include boot packages
    - org\.example\.business\..*  # Include business packages
    - org\.example\.controller\..*  # Include controller packages
  
  # Development mode
  # true: Output detailed scanning logs
  # false: Silent mode
  # Default auto-detects based on spring.profiles.active (dev/local/test = true)
  dev-mode: true
```

### Properties Format

```properties
# Enable or disable AutoScan component (v1.2.0+)
auto-scan.enabled=true

# Base package paths (required)
auto-scan.base-packages[0]=org.example.*
auto-scan.base-packages[1]=com.company.**

# Business package paths (optional)
auto-scan.business-packages[0]=org.example.business

# Exclude packages (optional) - v1.1.0+
auto-scan.exclude-packages[0]=org.example.test
auto-scan.exclude-packages[1]=org.example.example

# Exclude classes (optional) - v1.1.0+
auto-scan.exclude-classes[0]=org.example.demo.DemoClass

# Include annotations (optional) - v1.1.0+
auto-scan.include-annotations[0]=org.springframework.stereotype.Service
auto-scan.include-annotations[1]=org.springframework.stereotype.Controller
auto-scan.include-annotations[2]=org.example.annotation.CustomComponent

# Direct imports (optional) - v1.2.0+
auto-scan.imports[0]=org.example.config.AppConfig
auto-scan.imports[1]=org.example.config.WebConfig
auto-scan.imports[2]=org.example.config.SecurityConfig

# Lazy initialization (optional) - v1.2.0+
# Global lazy initialization
auto-scan.lazy-initialization=true
# Package-level lazy initialization
auto-scan.lazy-packages[0]=org.example.service
auto-scan.lazy-packages[1]=org.example.repository
# Class-level lazy initialization
auto-scan.lazy-classes[0]=org.example.controller.UserController
auto-scan.lazy-classes[1]=org.example.service.OrderService

# Regex-based package filtering (optional) - v1.3.0+
# Exclude packages using regex patterns
auto-scan.exclude-packages-regex[0]=org\.example\.test\..*
auto-scan.exclude-packages-regex[1]=org\.example\.example\..*
auto-scan.exclude-packages-regex[2]=.*\.temp\..*
# Include packages using regex patterns
auto-scan.include-packages-regex[0]=org\.example\.boot\..*
auto-scan.include-packages-regex[1]=org\.example\.business\..*
auto-scan.include-packages-regex[2]=org\.example\.controller\..*

# Development mode
auto-scan.dev-mode=true
```

## Configuration Details

### base-packages

`base-packages` is a required configuration item for specifying base package paths to scan. These packages typically contain technical infrastructure, business infrastructure, and other common components.

#### Basic Configuration

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Core framework package
    - org.example.common      # Common components package
    - org.example.security    # Security components package
    - com.company.framework   # Company framework package
```

#### Wildcard Configuration (v1.1.0+)

Supports using wildcards to simplify configuration:

```yaml
auto-scan:
  base-packages:
    - org.example.*        # Matches all first-level packages under org.example
    - com.company.**       # Matches all packages under com.company
```

**Wildcard Description**:
- `*` - Matches single-level package (e.g., `org.example.*` matches `org.example.boot`, `org.example.base`, etc.)
- `**` - Matches multi-level packages (e.g., `com.company.**` matches all packages under `com.company`)

### business-packages

`business-packages` is an optional configuration item, only needed when this project serves as infrastructure for other projects. It specifies business package paths that need to be scanned by other projects.

```yaml
auto-scan:
  business-packages:
    - org.example.business    # Common business package
    - org.example.core        # Business core package
```

### exclude-packages (v1.1.0+)

`exclude-packages` is used to exclude specific packages from being scanned.

```yaml
auto-scan:
  exclude-packages:
    - org.example.test        # Exclude test package
    - org.example.example     # Exclude example package
    - org.example.demo        # Exclude demo package
```

**Use Cases**:
- Exclude test code
- Exclude example code
- Exclude temporary code
- Exclude unnecessary modules

### exclude-classes (v1.1.0+)

`exclude-classes` is used to exclude specific classes from being scanned.

```yaml
auto-scan:
  exclude-classes:
    - org.example.demo.DemoClass          # Exclude demo class
    - org.example.temp.TempComponent      # Exclude temporary component
    - org.example.test.TestService        # Exclude test service
```

**Use Cases**:
- Exclude specific demo classes
- Exclude temporary components
- Exclude test components
- Precise control over scanning scope

### include-annotations (v1.1.0+)

`include-annotations` is used to configure custom annotations for scanning.

```yaml
auto-scan:
  include-annotations:
    # Spring built-in annotations
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - org.springframework.stereotype.Repository
    
    # Custom annotations
    - org.example.annotation.CustomComponent
    - org.example.annotation.BusinessService
```

**Use Cases**:
- Scan components marked with custom annotations
- Extend scanning capabilities
- Implement specific component classification

### dev-mode

`dev-mode` controls whether to output detailed scanning logs. When set to `true`, AutoScan outputs the following information:

- Scanner initialization information
- Configured base package list
- Wildcard resolution results
- Exclude filter configuration
- Annotation filter configuration
- Final package list to scan
- Number of successfully registered beans

Defaults to auto-detection based on `spring.profiles.active`, automatically enabling development mode if the current active profile is `dev`, `local`, or `test`.

### imports (v1.2.0+)

`imports` is used to directly import specific classes, similar to Spring's `@Import` annotation.

```yaml
auto-scan:
  imports:
    - org.example.config.AppConfig
    - org.example.config.WebConfig
    - org.example.config.SecurityConfig
```

**Use Cases**:
- Import specific configuration classes
- Import third-party library configurations
- Avoid using `@Import` annotation in code

### lazy-initialization (v1.2.0+)

`lazy-initialization` is used to enable global lazy initialization for all scanned beans.

```yaml
auto-scan:
  lazy-initialization: true  # Enable global lazy initialization
```

**Use Cases**:
- Optimize application startup performance
- Reduce memory usage
- Suitable for large applications

### lazy-packages (v1.2.0+)

`lazy-packages` is used to specify package paths for which beans should be lazily initialized.

```yaml
auto-scan:
  lazy-packages:
    - org.example.service  # Enable lazy loading for beans in this package
    - org.example.repository
```

**Use Cases**:
- Enable lazy loading for beans in specific packages
- More fine-grained control over lazy loading scope

### lazy-classes (v1.2.0+)

`lazy-classes` is used to specify fully qualified class names for which beans should be lazily initialized.

```yaml
auto-scan:
  lazy-classes:
    - org.example.controller.UserController  # Enable lazy loading for this class
    - org.example.service.OrderService
```

**Use Cases**:
- Enable lazy loading for specific classes
- Precise control over lazy loading scope

### enabled (v1.2.0+)

`enabled` is used to completely enable or disable the AutoScan component.

```yaml
# Enable AutoScan
auto-scan:
  enabled: true  # Default value is true

# Disable AutoScan
auto-scan:
  enabled: false  # Even if other options are configured, no scanning will be performed
```

**Use Cases**:
- Development environment: Enable AutoScan to enjoy the convenience of automatic scanning
- Production environment: Can disable AutoScan if needed, using manual configuration
- Test environment: Can disable AutoScan, using specific test configurations

### exclude-packages-regex (v1.3.0+)

`exclude-packages-regex` is used to exclude packages using regex patterns.

```yaml
auto-scan:
  exclude-packages-regex:
    - org\.example\.test\..*  # Exclude all test packages
    - org\.example\.example\..*  # Exclude all example packages
    - .*\.temp\..*  # Exclude packages containing "temp"
```

**Use Cases**:
- Exclude packages matching specific patterns
- More flexible exclusion rules
- Handle complex package structures

### include-packages-regex (v1.3.0+)

`include-packages-regex` is used to include packages using regex patterns. If specified, only packages matching these patterns will be included.

```yaml
auto-scan:
  include-packages-regex:
    - org\.example\.boot\..*  # Include boot packages
    - org\.example\.business\..*  # Include business packages
    - org\.example\.controller\..*  # Include controller packages
    - .*Service  # Include classes ending with "Service"
```

**Use Cases**:
- Include only packages matching specific patterns
- More flexible inclusion rules
- Precise control over scanning scope

## Configuration Scenarios

### Scenario 1: Technical Infrastructure Project

```yaml
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.common
    - org.example.security
  dev-mode: true
```

### Scenario 2: Business Infrastructure Project

```yaml
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.framework
  business-packages:
    - org.example.business
  dev-mode: true
```

### Scenario 3: Using Wildcards (v1.1.0+)

```yaml
auto-scan:
  base-packages:
    - org.example.*
    - com.company.**
  dev-mode: true
```

### Scenario 4: Excluding Test Code (v1.1.0+)

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test
    - org.example.example
  dev-mode: true
```

### Scenario 5: Custom Annotation Scanning (v1.1.0+)

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.springframework.stereotype.Service
    - org.example.annotation.CustomComponent
  dev-mode: true
```

### Scenario 6: Combined Configuration (v1.1.0+)

```yaml
auto-scan:
  # Wildcard support
  base-packages:
    - org.example.*
    - com.company.**
  
  # Exclude support
  exclude-packages:
    - org.example.test
  exclude-classes:
    - org.example.demo.DemoClass
  
  # Custom annotation support
  include-annotations:
    - org.springframework.stereotype.Service
    - org.example.annotation.CustomComponent
  
  dev-mode: true
```

## Configuration Best Practices

### 1. Use Wildcards to Simplify Configuration

```yaml
# Not recommended: List all packages individually
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.common
    - org.example.security
    - org.example.framework

# Recommended: Use wildcards
auto-scan:
  base-packages:
    - org.example.*
```

### 2. Exclude Unnecessary Packages

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test      # Exclude test package
    - org.example.example   # Exclude example package
```

### 3. Disable Logs in Production

```yaml
# application-prod.yml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: false  # Disable logs in production
```

### 4. Enable Logs in Development

```yaml
# application-dev.yml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true  # Enable logs in development
```

## Configuration Validation

After starting the application, you can verify if the configuration is correct by:

1. **View scanning logs**: Enable `dev-mode` to see detailed scanning process
2. **Check bean registration**: Use Actuator or debugging tools to view registered beans
3. **Verify component injection**: Ensure required components can be injected normally

If there are configuration issues, AutoScan will output corresponding error messages in the logs to help you quickly locate problems.
