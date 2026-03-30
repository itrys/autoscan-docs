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

## Complete Configuration Example

### YAML Format

```yaml
auto-scan:
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
  
  # Development mode
  # true: Output detailed scanning logs
  # false: Silent mode
  # Default auto-detects based on spring.profiles.active (dev/local/test = true)
  dev-mode: true
```

### Properties Format

```properties
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
