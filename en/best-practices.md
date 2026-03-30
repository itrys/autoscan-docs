# Best Practices

## 1. Infrastructure Project Planning

### Technical Infrastructure (`org.example.boot`)

**Configuration Recommendations**:

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Core framework
    - org.example.common      # Common utilities
    - org.example.security    # Security components
```

**Planning Principles**:
- Place core framework functionality in `org.example.boot` package
- Place common utilities in `org.example.common` package
- Place security-related components in `org.example.security` package
- Keep package structure clear for easy management and maintenance

### Business Infrastructure (`com.company.framework`)

**Configuration Recommendations**:

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Contains technical infrastructure
    - com.company.core        # Business core
    - com.company.system      # System management
```

**Planning Principles**:
- Include technical infrastructure package paths
- Place business core functionality in `com.company.core` package
- Place system management functionality in `com.company.system` package
- Can further subdivide package structure by business domain

## 2. Business Project Development

**Configuration Recommendations**:

```yaml
# Only include infrastructure, minimize configuration
auto-scan:
  base-packages:
    - org.example.boot
    - com.company.core
```

**Development Principles**:
- Business projects should focus on implementing specific business logic
- Fully leverage capabilities provided by infrastructure
- No need to configure `business-packages` because `@SpringBootApplication` automatically scans the package where the startup class resides
- Maintain modularity and maintainability of business code

## 3. Multi-Layer Infrastructure Architecture

**Architecture Example**:

```
Technical Infrastructure (org.example.boot)
    ↓
Business Infrastructure A (com.company.framework)
    ↓
Business Infrastructure B (com.company.platform)
    ↓
Specific Business Project (com.company.project.xxx)
```

**Configuration Principles**:
- Each layer of infrastructure configures its own `base-packages`
- Upper-level infrastructure should include lower-level infrastructure package paths
- Business projects should include all required infrastructure package paths
- Maintain consistency and traceability of configuration

## 4. Using Wildcards to Simplify Configuration (v1.1.0+)

### Recommended Approach

```yaml
# Recommended: Use wildcards
auto-scan:
  base-packages:
    - org.example.*        # Matches all first-level packages
    - com.company.**       # Matches all sub-packages
```

### Not Recommended Approach

```yaml
# Not recommended: List all packages individually
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.common
    - org.example.security
    - org.example.framework
    - org.example.system
    # ... more packages
```

**Advantages**:
- Configuration is concise and clear
- No need to modify configuration when adding new packages
- Reduces configuration errors
- Improves maintainability

## 5. Excluding Unnecessary Packages (v1.1.0+)

### Exclude Test and Example Code

```yaml
auto-scan:
  base-packages:
    - org.example           # Scan entire package
  exclude-packages:
    - org.example.test      # Exclude test package
    - org.example.example   # Exclude example package
    - org.example.demo      # Exclude demo package
```

### Exclude Specific Classes

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-classes:
    - org.example.legacy.LegacyService      # Exclude legacy service
    - org.example.temp.TempComponent        # Exclude temporary component
    - org.example.deprecated.OldRepository  # Exclude deprecated repository
```

**Best Practices**:
- Exclude test code to avoid scanning test components
- Exclude example and demo code
- Exclude legacy and deprecated code
- Exclude temporary and experimental code

## 6. Custom Annotation Best Practices (v1.1.0+)

### Create Custom Annotation

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component  // Important: Must be annotated with @Component
public @interface BusinessService {
    String value() default "";
    String domain() default "";
}
```

### Use Custom Annotation

```java
@BusinessService(domain = "user")
public class UserService {
    // Business logic
}

@BusinessService(domain = "order")
public class OrderService {
    // Business logic
}
```

### Configure Scanning

```yaml
auto-scan:
  base-packages:
    - com.company
  include-annotations:
    - org.springframework.stereotype.Service
    - com.company.annotation.BusinessService
```

**Best Practices**:
- Custom annotations must be annotated with `@Component`
- Add meaningful attributes to custom annotations
- Use custom annotations for component classification
- Maintain single responsibility for annotations

## 7. Combined Use of New Features (v1.1.0+)

### Complete Configuration Example

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
    - com.company.annotation.BusinessService
  
  # Development mode
  dev-mode: true
```

### Configuration Priority

1. **Wildcard Resolution** - First resolve wildcards to specific package paths
2. **Exclude Filtering** - Apply package and class-level exclusion
3. **Annotation Filtering** - Apply annotation-level filtering
4. **Scan Execution** - Execute final scanning

## 8. Package Naming Conventions

**Recommended Package Naming Conventions**:

- **Technical Infrastructure**: `org.example.boot.*`
- **Business Infrastructure**: `com.company.framework.*`
- **Specific Business Projects**: `com.company.project.*`

**Package Structure Example**:

```
org.example.boot
├── core            # Core functionality
├── common          # Common utilities
├── security        # Security components
└── config          # Configuration management

com.company.framework
├── core            # Business core
├── system          # System management
├── user            # User management
└── order           # Order management

com.company.project
├── user-service    # User service
├── order-service   # Order service
└── payment-service # Payment service
```

## 9. Development Mode Usage

**Development Mode Configuration**:

```yaml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true  # Development mode, output detailed logs
```

**Development Recommendations**:
- Enable `dev-mode` in development environment for debugging and troubleshooting
- View scanning logs in console output to confirm scanning is normal
- Can disable `dev-mode` in production environment to reduce log output
- Use scanning logs to analyze scanning performance and optimize configuration

## 10. Troubleshooting Tips

**Common Issues and Solutions**:

### Components Not Being Scanned

1. Check if `auto-scan.base-packages` configuration is correct
2. Confirm components use `@Component`, `@Configuration`, or other configured annotations
3. Enable `dev-mode` to view scanning logs
4. Check if package paths contain unsupported wildcard patterns (v1.1.0+ supports `*` and `**`)
5. Check if filtered out by exclude configuration

### Scanning Performance Issues

1. Only configure necessary package paths, avoid over-scanning
2. Use wildcards to simplify configuration (v1.1.0+)
3. Use exclude functionality to reduce scanning scope (v1.1.0+)
4. Reasonably plan package structure to reduce scanning scope
5. Leverage Spring's caching mechanism to avoid repeated scanning

### Dependency Conflicts

1. Ensure infrastructure versions are consistent
2. Avoid repeatedly configuring the same packages in different layers
3. Use dependency management tools (like Maven BOM) to unify versions
4. Check if exclude configuration is correct

### Configuration Inheritance Issues

1. Ensure upper-level projects include lower-level infrastructure package paths
2. Check configuration file loading order
3. Verify final scanning package list is correct
4. Use wildcards to ensure configuration completeness (v1.1.0+)

## 11. Version Management

**Version Management Recommendations**:
- Use semantic versioning (Semantic Versioning)
- Infrastructure project version changes should be backward compatible
- Business projects should explicitly specify dependent infrastructure versions
- Regularly update infrastructure versions to get latest features and bug fixes

**v1.1.0 Upgrade Recommendations**:
- Fully backward compatible with v1.0.0
- Can gradually adopt new features
- Recommend using wildcards to simplify configuration first
- Then use exclude and custom annotation features

## 12. Documentation and Examples

**Documentation Recommendations**:
- Provide detailed documentation for infrastructure projects
- Include configuration examples and usage instructions
- Provide FAQs and solutions
- Maintain changelog to record version changes
- Explain how to use v1.1.0 new features

**Example Recommendations**:
- Provide complete example projects
- Include configuration examples for different scenarios
- Demonstrate best practices and common usage
- Provide integration tests and unit tests
- Show usage examples of new features

## 13. Performance Optimization Recommendations

### Scanning Scope Optimization

```yaml
# Recommended: Precise scanning scope
auto-scan:
  base-packages:
    - org.example.boot
    - org.example.common
  exclude-packages:
    - org.example.test

# Not recommended: Overly broad scanning scope
auto-scan:
  base-packages:
    - org.example.**  # May scan too many unnecessary packages
```

### Development Mode Optimization

```yaml
# Development environment
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true  # Enable logs

# Production environment
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: false  # Disable logs
```

### Wildcard Optimization

```yaml
# Recommended: Precise wildcards
auto-scan:
  base-packages:
    - org.example.boot.*
    - org.example.common.*

# Not recommended: Overly broad wildcards
auto-scan:
  base-packages:
    - org.**  # Scanning scope too large
```
