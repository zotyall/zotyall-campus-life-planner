# zotyall-campus-life-planner

## Regex Catalog

The application uses regular expressions for form validation and search functionality.

### Title Validation

Prevents leading and trailing spaces.

```regex
^\S(?:.*\S)?$
```

**Valid Examples**

```text
Study Session
Math Assignment
Campus Meeting
```

**Invalid Examples**

```text
 Study Session
Math Assignment 
```

### Duration Validation

Accepts positive whole numbers and decimals up to two decimal places.

```regex
^(0|[1-9]\d*)(\.\d{1,2})?$
```

**Valid Examples**

```text
60
90
120.50
```

**Invalid Examples**

```text
-10
05
abc
```

### Date Validation

Validates dates in YYYY-MM-DD format.

```regex
^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
```

### Tag Validation

Allows letters, spaces, and hyphens only.

```regex
^[A-Za-z]+(?:[ -][A-Za-z]+)*$
```

### Advanced Regex

Detects duplicate consecutive words.

```regex
\b(\w+)\s+\1\b
```

**Matches**

```text
Study Study
Meeting Meeting
```

---

## Keyboard Navigation

The application supports keyboard-only navigation.

| Key | Function |
|------|----------|
| Tab | Move to next interactive element |
| Shift + Tab | Move to previous interactive element |
| Enter | Submit forms and activate buttons |
| Space | Activate buttons and controls |
| Arrow Keys | Navigate select menus |
| Esc | Close dialogs (if applicable) |

---

## Accessibility Notes

The application follows accessibility best practices:

- Semantic HTML landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Properly associated labels and form controls
- Visible keyboard focus indicators
- Skip-to-content navigation link
- ARIA live regions for status and error messages
- Responsive layouts for mobile, tablet, and desktop devices
- High color contrast for readability
- Keyboard-only navigation support

### Example ARIA Live Region

```html
<div aria-live="polite" role="status"></div>
```

Used to announce:

- Task added
- Task updated
- Task deleted
- Data imported
- Data exported

---

## Running Tests

1. Open the project in VS Code.
2. Start Live Server.
3. Open `tests.html`.

### Test Coverage

- Title validation
- Duration validation
- Date validation
- Tag validation
- Advanced regex checks
- Search functionality
- JSON validation

### Expected Result

All tests should display a **PASS** status.

If a test fails:

1. Verify the regex pattern.
2. Check the input data.
3. Refresh the browser.
4. Run the tests again.
