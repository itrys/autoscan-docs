# Architecture Design

## Core Components

```
autoscan-spring-boot-starter
├── AutoScanApplicationContextInitializer
│   └── Implements ApplicationContextInitializer interface
│   └── Executes scanning during early Spring container startup
│   └── Supports wildcard resolution, exclude filtering, and custom annotations
│   └── Supports @Import compatibility and lazy initialization
│   └── Supports regex filtering and environment conditional configuration
│
├── AutoScanProperties
│   └── Configuration properties class
│   └── Supports base-packages, business-packages, dev-mode
│   └── Supports exclude-packages, exclude-classes, include-annotations
│   └── Supports imports, lazy-initialization, lazy-packages, lazy-classes, enabled
│   └── Supports exclude-packages-regex, include-packages-regex
│
└── spring.factories
    └── Registers AutoScanApplicationContextInitializer
```

### AutoScanApplicationContextInitializer

`AutoScanApplicationContextInitializer` is the core component of AutoScan. It implements Spring's `ApplicationContextInitializer` interface and executes scanning operations during the early stage of Spring container startup.

Main responsibilities:
1. Read `auto-scan` configuration from configuration files
2. Resolve wildcard package paths (v1.1.0+)
3. Build list of packages to scan
4. Apply exclude filters (v1.1.0+)
5. Set custom annotation filters (v1.1.0+)
6. Create `ClassPathBeanDefinitionScanner` for scanning
7. Register scanned components to Spring container
8. Output scanning logs (in development mode)

### AutoScanProperties

`AutoScanProperties` is the configuration properties class for storing and managing AutoScan configuration items:

**Basic Configuration**:
- `basePackages` - List of base package paths (supports wildcards)
- `businessPackages` - List of business package paths (supports wildcards)
- `devMode` - Development mode flag

**v1.1.0 New Configuration**:
- `excludePackages` - List of excluded package paths
- `excludeClasses` - List of excluded fully qualified class names
- `includeAnnotations` - List of included fully qualified annotation names

### spring.factories

The `spring.factories` file is used to register `AutoScanApplicationContextInitializer`, enabling it to be automatically loaded during Spring Boot startup:

```
org.springframework.context.ApplicationContextInitializer=
org.itrys.autoscan.context.AutoScanApplicationContextInitializer
```

## Scanning Process

### Basic Process

1. **Read Configuration** - Read configuration items from `application.yml` or `application.properties`
   - `auto-scan.base-packages`
   - `auto-scan.business-packages`
   - `auto-scan.exclude-packages` (v1.1.0+)
   - `auto-scan.exclude-classes` (v1.1.0+)
   - `auto-scan.include-annotations` (v1.1.0+)
   - `auto-scan.imports` (v1.2.0+)
   - `auto-scan.lazy-initialization` (v1.2.0+)
   - `auto-scan.lazy-packages` (v1.2.0+)
   - `auto-scan.lazy-classes` (v1.2.0+)
   - `auto-scan.enabled` (v1.2.0+)
   - `auto-scan.exclude-packages-regex` (v1.3.0+)
   - `auto-scan.include-packages-regex` (v1.3.0+)

2. **Resolve Wildcards** (v1.1.0+) - Resolve wildcard patterns in package paths to actual package paths
   - `*` Single-level wildcard
   - `**` Multi-level wildcard

3. **Build Scan List** - Merge base packages and business packages, remove duplicates

4. **Create Scanner** - Create scanner using `ClassPathBeanDefinitionScanner`

5. **Set Filters** - Add filters for `@Component`, `@Configuration`, and custom annotations (v1.1.0+)

6. **Set Exclude Filters** (v1.1.0+) - Add exclude filters for specified packages and classes

7. **Execute Scanning** - Scan all configured package paths

8. **Register Components** - Register scanned components to Spring container

### v1.3.0 Enhanced Process

```
Read Configuration
    ↓
Check Enable Status
    ↓
Resolve Wildcards
    ↓
Build Scan List
    ↓
Apply Exclude Filters
    ↓
Apply Regex Filters (New)
    ↓
Set Annotation Filters
    ↓
Execute Scanning
    ↓
Register Components
    ↓
Handle @Import Import
    ↓
Handle Lazy Initialization
```

## Execution Timing

The execution timing of AutoScan is critical. It executes during the early stage of Spring container startup, earlier than the processing of `@ComponentScan` annotation. This ensures that components in base packages are registered to the container before business packages are scanned, avoiding dependency issues.

Execution timing:
1. Spring Boot starts
2. Load `ApplicationContextInitializer` from `spring.factories`
3. Execute `AutoScanApplicationContextInitializer.initialize()` method
4. Read configuration (including v1.3.0 new configuration items)
5. Check enable status (v1.2.0+) - if `enabled` is false, skip subsequent steps
6. Resolve wildcards (v1.1.0+)
7. Apply exclude and annotation filters (v1.1.0+)
8. Apply regex filters (v1.3.0+) - handle exclude-packages-regex and include-packages-regex
9. Execute scanning
10. Register scanned components
11. Handle @Import import (v1.2.0+) - directly import specified classes
12. Handle lazy initialization (v1.2.0+) - set lazy loading for specified beans
13. Continue Spring container startup process
14. Process `@ComponentScan` annotation

## Technical Principles

AutoScan's core technical principles leverage Spring's `ApplicationContextInitializer` interface and `ClassPathBeanDefinitionScanner` class:

### 1. ApplicationContextInitializer

Allows custom operations before Spring container initialization, the key to implementing early scanning.

### 2. ClassPathBeanDefinitionScanner

Used to scan components on the classpath, supports filtering by package path and annotation type.

**v1.1.0 Enhancements**:
- Supports wildcard path resolution
- Supports exclude filters
- Supports custom annotation filters

### 3. Binder

Used to bind properties from configuration files to `AutoScanProperties` object.

### 4. Spring Factories Mechanism

Used to automatically register `ApplicationContextInitializer`, no manual configuration needed.

### 5. Wildcard Resolution (v1.1.0+)

Uses `PathMatchingResourcePatternResolver` to resolve wildcard paths:
- `*` - Matches single-level package
- `**` - Matches multi-level packages

### 6. Exclude Filters (v1.1.0+)

Uses `TypeFilter` to implement exclusion functionality:
- Package-level exclusion
- Class-level exclusion

### 7. Annotation Filters (v1.1.0+)

Uses `AnnotationTypeFilter` to implement custom annotation scanning:
- Supports built-in annotations
- Supports custom annotations

### 8. @Import Compatibility (v1.2.0+)

Uses Spring's `ImportBeanDefinitionRegistrar` mechanism:
- Directly imports specified classes
- Supports configuration classes, regular classes, etc.
- Equivalent to using `@Import` annotation

### 9. Lazy Initialization (v1.2.0+)

Implemented by modifying the `lazyInit` property of Bean definitions:
- Global lazy loading: sets all scanned beans to lazy loading
- Package-level lazy loading: sets beans in specified packages to lazy loading
- Class-level lazy loading: sets specified classes to lazy loading

### 10. Enable Switch (v1.2.0+)

Implemented by checking the `enabled` configuration item during initialization:
- When `enabled` is `false`, skips all scanning and processing logic
- Defaults to `true` for backward compatibility

### 11. Regex Filtering (v1.3.0+)

Implemented through `Pattern` class and custom `TypeFilter`:
- Supports using regex to match package paths
- Supports both exclude and include modes
- Provides more flexible scanning control

### 12. Environment Conditional Configuration (v1.3.0+)

Leverages Spring Boot's environment configuration mechanism:
- Supports using different scanning configurations in different environments
- Implements environment switching with `spring.profiles.active`
- Provides more flexible configuration management

## Design Advantages

### 1. Non-Invasive

- Doesn't change existing code structure
- Just add dependency and configuration
- Compatible with existing Spring mechanisms

### 2. Flexible Configuration

- YAML/Properties configuration
- Multi-environment support
- Dynamic configuration capability

### 3. Performance Optimized

- Early execution, avoids conflicts
- Precise scanning scope
- Caching mechanism

### 4. Highly Extensible (v1.1.0+)

- Wildcard support
- Exclusion mechanism
- Custom annotations

### 5. Configuration Flexibility (v1.2.0+)

- @Import compatibility: directly import specific classes in configuration
- Lazy initialization: optimize application startup performance and memory usage
- Enable switch: provide complete enable/disable control

### 6. Advanced Filtering Capability (v1.3.0+)

- Regex filtering: support using regex for package filtering
- Environment conditional configuration: support environment-based scanning configuration
- More precise scanning control: combine regex and environment configuration for more flexible scanning strategies

## Architecture Evolution

### v1.0.0 Architecture

```
Configuration Read → Package List Build → Scan → Register
```

### v1.1.0 Architecture

```
Configuration Read → Wildcard Resolution → Package List Build → Exclude Filter → Annotation Filter → Scan → Register
```

**Enhancements**:
1. Wildcard resolution layer
2. Exclude filter layer
3. Annotation filter layer

### v1.2.0 Architecture

```
Configuration Read → Enable Status Check → Wildcard Resolution → Package List Build → Exclude Filter → Annotation Filter → Scan → Register → @Import Process → Lazy Initialization Process
```

**Enhancements**:
1. Enable status check layer
2. @Import processing layer
3. Lazy initialization processing layer

### v1.3.0 Architecture

```
Configuration Read → Enable Status Check → Wildcard Resolution → Package List Build → Exclude Filter → Regex Filter → Annotation Filter → Scan → Register → @Import Process → Lazy Initialization Process
```

**Enhancements**:
1. Regex filter layer
2. Environment conditional configuration support

## Future Plans

### v1.4.0 Plans

- Plugin system
- Monitoring dashboard

### Long-term Vision

- Spring Cloud integration
- AI-powered intelligent scanning
- Configuration visualization tool
- Plugin system
- Monitoring dashboard
