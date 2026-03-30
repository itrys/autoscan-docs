# FAQ

## Q1: Does AutoScan conflict with @ComponentScan?

**A**: No conflict. AutoScan executes during the early stage of Spring container startup, earlier than `@ComponentScan`. Both can coexist, but it's recommended to use AutoScan uniformly for base package scanning management to maintain configuration consistency and maintainability.

## Q2: How to exclude certain packages from being scanned?

**A**: Starting from v1.1.0, AutoScan supports exclude scanning functionality. You can configure `exclude-packages` to exclude specific packages, and configure `exclude-classes` to exclude specific classes:

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test      # Exclude test package
    - org.example.example   # Exclude example package
  exclude-classes:
    - org.example.demo.DemoClass  # Exclude specific class
```

## Q3: Does AutoScan support Spring Boot 3.x?

**A**: Yes. AutoScan 1.1.0 is developed based on Spring Boot 3.2.0 and is fully compatible with Spring Boot 3.x/4.x versions.

## Q4: What should I do if components cannot be scanned?

**A**: You can troubleshoot by following these steps:

1. Check if `auto-scan.base-packages` configuration is correct
2. Enable `dev-mode: true` to view scanning logs
3. Confirm components use `@Component`, `@Configuration`, or other configured annotations
4. Check if package paths contain unsupported wildcard patterns (v1.1.0+ supports `*` and `**` wildcards)
5. Check if filtered out by exclude configuration

## Q5: Will AutoScan affect application startup performance?

**A**: AutoScan has minimal impact on startup performance because:

1. It only scans configured package paths, avoiding full classpath scanning
2. Scanning process executes during early Spring container startup, doesn't affect subsequent startup process
3. Spring caches scanning results, avoiding repeated scanning
4. Scanning scope is controllable, you can configure only necessary package paths
5. Supports exclude scanning to further reduce unnecessary scanning

## Q6: How to use AutoScan in multi-module projects?

**A**: In multi-module projects, you can:

1. Add AutoScan dependency in parent module
2. Configure corresponding `base-packages` in each submodule's configuration file
3. Ensure submodule configuration includes all required base package paths
4. Leverage AutoScan's multi-layer infrastructure support feature
5. Use wildcards to simplify configuration (v1.1.0+)

## Q7: What annotations does AutoScan support for scanning?

**A**: AutoScan supports scanning classes with the following annotations:

**Default Support**:
- `@Component` and its derived annotations (`@Service`, `@Controller`, `@Repository`, `@RestController`)
- `@Configuration` and `@Bean` methods

**Custom Support (v1.1.0+)**:
- Configure custom annotations through `include-annotations`

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.springframework.stereotype.Service
    - org.example.annotation.CustomComponent
```

## Q8: How to verify if AutoScan is working properly?

**A**: You can verify by:

1. Viewing scanning logs in console output (enable `dev-mode: true`)
2. Checking if components from base packages are successfully injected
3. Verifying business package components are scanned normally
4. Testing if application functionality works properly
5. Using Spring Boot Actuator to view bean registration

## Q9: Does AutoScan conflict with other Starters?

**A**: AutoScan is designed to be non-invasive and won't conflict with other Starters. It only executes scanning operations during early Spring container startup and won't affect other Starter functionality.

## Q10: How to upgrade AutoScan version?

**A**: Upgrading AutoScan version is very simple:

1. Update AutoScan version number in `pom.xml` file
2. Check for configuration changes in new version (if any)
3. Rebuild and deploy application

**Upgrading from v1.0.0 to v1.1.0**:
- Fully backward compatible, no configuration changes needed
- Can use new features (wildcards, exclude scanning, custom annotations)

## Q11: Does AutoScan support multi-environment configuration file management?

**A**: Yes. AutoScan supports Spring Boot's multi-environment configuration management. You can set different `auto-scan` configurations in different environment configuration files. For example:

```yaml
# application-dev.yml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: true  # Enable logs in development environment

# application-prod.yml
auto-scan:
  base-packages:
    - org.example.*
  dev-mode: false  # Disable logs in production environment
```

## Q12: How to use AutoScan in test environment?

**A**: In test environment, you can:

1. Set `auto-scan.base-packages` in test configuration file
2. Enable `dev-mode: true` to view scanning logs
3. Leverage AutoScan's automatic scanning capability to simplify test configuration
4. Ensure test environment configuration is consistent with production environment
5. Use exclude functionality to exclude test-specific components

## Q13: Does AutoScan support custom scan filters?

**A**: Starting from v1.1.0, AutoScan supports custom annotation scanning:

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.example.annotation.CustomComponent
```

You can also create custom annotations:

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component
public @interface CustomComponent {
    String value() default "";
}
```

## Q14: How to use wildcards in package paths?

**A**: Starting from v1.1.0, AutoScan supports wildcards:

**Single-Level Wildcard `*`**:
```yaml
auto-scan:
  base-packages:
    - org.example.*  # Matches org.example.boot, org.example.base, etc.
```

**Multi-Level Wildcard `**`**:
```yaml
auto-scan:
  base-packages:
    - org.example.**  # Matches org.example and all its sub-packages
```

**Mixed Usage**:
```yaml
auto-scan:
  base-packages:
    - org.example.*      # Single-level wildcard
    - com.company.**     # Multi-level wildcard
```

## Q15: How to disable AutoScan in Spring Boot application?

**A**: If you need to temporarily disable AutoScan, you can set in configuration file:

```yaml
auto-scan:
  base-packages: []  # Empty list, skip scanning
```

Or directly remove AutoScan dependency.

## Q16: What are AutoScan's future plans?

**A**: AutoScan's future plans include:

**v1.2.0 Plans**:
- 📦 @Import Compatibility - Directly import specific classes in configuration
- ⚡ Lazy Initialization - Support lazy bean initialization

**v1.3.0 Plans**:
- 🎯 Advanced Filtering - Regex-based package filtering
- 🔄 Conditional Configuration - Environment-based scanning

**Long-term Vision**:
- 🔌 Plugin System - Extensible scanning strategies
- 📊 Monitoring Dashboard - Visual scanning analysis
- 🌐 Spring Cloud Integration - Microservices optimization

## Q17: How to create and use custom annotations?

**A**: Steps to create custom annotations:

**1. Create Custom Annotation**:
```java
package com.company.annotation;

import org.springframework.stereotype.Component;
import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component  // Important: Must be annotated with @Component
public @interface CustomComponent {
    String value() default "";
}
```

**2. Use Custom Annotation**:
```java
package com.company.service;

import com.company.annotation.CustomComponent;

@CustomComponent
public class CustomService {
    // Business logic
}
```

**3. Configure Scanning**:
```yaml
auto-scan:
  base-packages:
    - com.company
  include-annotations:
    - com.company.annotation.CustomComponent
```

**Note**: Custom annotations must be annotated with `@Component` to be recognized by Spring's component scanning mechanism.

## Q18: Can wildcards, exclusion, and custom annotations be used together?

**A**: Yes! These features can be flexibly combined:

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

This combined configuration can achieve very flexible and precise scanning control.
