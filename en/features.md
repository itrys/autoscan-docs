# Core Features

## Automatic Base Package Scanning

AutoScan implements the `ApplicationContextInitializer` interface to automatically scan configured base packages during the early stage of Spring container startup. This means you only need to configure once in the infrastructure project, and all business projects depending on it will automatically inherit these scanning configurations.

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Technical infrastructure
    - org.example.base        # Business infrastructure
```

## Zero Configuration for Business Packages

AutoScan cleverly leverages the default scanning mechanism of `@SpringBootApplication`, eliminating the need for separate configuration of business packages. When you use the `@SpringBootApplication` annotation in your business project, it automatically scans the package where the startup class resides and its sub-packages, allowing business code to integrate seamlessly.

```java
@SpringBootApplication  // Auto-scans com.company.project package and sub-packages
public class ProjectApplication {
    // ...
}
```

## Multi-Layer Infrastructure Support

AutoScan supports multi-layer infrastructure architecture, where business projects can also serve as infrastructure for other projects. By configuring `business-packages`, you can specify business packages that need to be scanned when this project serves as infrastructure.

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Technical infrastructure
  business-packages:
    - com.company.business  # Common business packages
```

## Non-Invasive Design

AutoScan adopts a non-invasive design that doesn't change existing code structure. You don't need to modify any existing code, just add the dependency and perform simple configuration to use it.

## Developer-Friendly

AutoScan provides detailed scanning logs for debugging and troubleshooting. In development mode, it outputs detailed scanning process and results, helping you understand which packages were scanned, how many beans were registered, etc.

```
>>> [AutoScan] Initializing base package scanner...
>>> [AutoScan] Configured base packages: [org.example.boot, org.example.base]
>>> [AutoScan] Final packages to scan: [org.example.boot, org.example.base]
>>> [AutoScan] Successfully registered 58 bean(s) from base packages.
```

## Lightweight

AutoScan is a lightweight Starter with no extra dependencies, fully compatible with Spring Boot. Its implementation is very concise, containing only a few core classes, without adding complexity or dependency burden to the project.

## Wildcard Package Support (v1.1.0+)

AutoScan supports using wildcards in package paths to simplify configuration and improve flexibility:

### Single-Level Wildcard `*`

Matches one level of package path:

```yaml
auto-scan:
  base-packages:
    - org.example.*  # Matches org.example.boot, org.example.base, etc.
```

### Multi-Level Wildcard `**`

Matches all sub-packages:

```yaml
auto-scan:
  base-packages:
    - org.example.**  # Matches org.example and all its sub-packages
```

### Mixed Usage

```yaml
auto-scan:
  base-packages:
    - org.example.*      # Single-level wildcard
    - com.company.**     # Multi-level wildcard
```

## Exclude Scanning (v1.1.0+)

AutoScan supports excluding specific packages and classes for precise control over scanning scope:

### Exclude Packages

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test      # Exclude test package
    - org.example.example   # Exclude example package
```

### Exclude Classes

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-classes:
    - org.example.demo.DemoClass  # Exclude specific class
    - org.example.temp.TempComponent
```

### Combined Usage

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test
  exclude-classes:
    - org.example.demo.DemoClass
```

## Custom Annotation Scanning (v1.1.0+)

AutoScan supports configuring custom annotations for component scanning, extending scanning capabilities:

### Configure Custom Annotations

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.springframework.stereotype.Service
    - org.springframework.stereotype.Controller
    - com.company.annotation.CustomComponent  # Custom annotation
```

### Create Custom Annotation

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

### Use Custom Annotation

```java
package com.company.service;

import com.company.annotation.CustomComponent;

@CustomComponent
public class CustomService {
    // Business logic
}
```

**Note**: Custom annotations must be annotated with `@Component` to be recognized by Spring's component scanning mechanism.

## Supported Annotations

AutoScan automatically scans all Spring built-in annotations derived from `@Component`:

| Annotation | Package | Description |
|------------|---------|-------------|
| `@Component` | `org.springframework.stereotype` | Generic component annotation |
| `@Service` | `org.springframework.stereotype` | Service layer component |
| `@Repository` | `org.springframework.stereotype` | Data access layer component |
| `@Controller` | `org.springframework.stereotype` | Web controller component |
| `@RestController` | `org.springframework.web.bind.annotation` | RESTful web controller |
| `@Configuration` | `org.springframework.context.annotation` | Configuration class |
| `@Bean` | `org.springframework.context.annotation` | Bean definition method |
