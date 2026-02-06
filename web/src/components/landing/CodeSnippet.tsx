import { useState, type ReactNode } from "react"
import { Copy, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const languages = [
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "curl", label: "cURL" },
] as const

type LanguageId = (typeof languages)[number]["id"]

const codeSnippets: Record<LanguageId, string> = {
  python: `import requests

# Login and get JWT tokens
response = requests.post(
    'http://localhost:8000/api/v1/auth/jwt/create/',
    json={
        "email": "user@example.com",
        "password": "your-password"
    }
)
tokens = response.json()
# {"access": "eyJ...", "refresh": "eyJ..."}

# Get current user profile
user = requests.get(
    'http://localhost:8000/api/v1/auth/users/me/',
    headers={'Authorization': f'Bearer {tokens["access"]}'}
).json()

print(f"Welcome, {user['full_name']}!")`,

  javascript: `// Login and get JWT tokens
const response = await fetch(
    'http://localhost:8000/api/v1/auth/jwt/create/',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'user@example.com',
            password: 'your-password'
        })
    }
);
const tokens = await response.json();
// { access: "eyJ...", refresh: "eyJ..." }

// Get current user profile
const user = await fetch(
    'http://localhost:8000/api/v1/auth/users/me/',
    {
        headers: {
            'Authorization': \`Bearer \${tokens.access}\`
        }
    }
).then(res => res.json());

console.log(\`Welcome, \${user.full_name}!\`);`,

  curl: `# Login and get JWT tokens
curl -X POST http://localhost:8000/api/v1/auth/jwt/create/ \\
    -H "Content-Type: application/json" \\
    -d '{"email": "user@example.com", "password": "your-password"}'

# Response: {"access": "eyJ...", "refresh": "eyJ..."}

# Get current user profile
curl http://localhost:8000/api/v1/auth/users/me/ \\
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Response: {"id": "...", "email": "...", "full_name": "..."}`,
}

export function CodeSnippet() {
  const [activeTab, setActiveTab] = useState<LanguageId>("python")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippets[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value: string) => setActiveTab(value as LanguageId)}
      className="bg-dark rounded-xl overflow-hidden max-w-[720px] mx-auto shadow-2xl"
    >
      {/* Tabs Header */}
      <div className="flex items-center border-b border-border-soft overflow-x-auto">
        {/* Window dots */}
        <div className="flex items-center gap-2 px-4 py-3 border-r border-border-soft">
          <div className="w-3 h-3 rounded-full bg-coral" />
          <div className="w-3 h-3 rounded-full bg-yellow" />
          <div className="w-3 h-3 rounded-full bg-green" />
        </div>

        {/* Language tabs */}
        <TabsList className="bg-transparent h-auto p-0 rounded-none">
          {languages.map((lang) => (
            <TabsTrigger
              key={lang.id}
              value={lang.id}
              className="px-4 py-3 text-sm font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-coral data-[state=active]:bg-transparent data-[state=active]:text-text-muted data-[state=active]:shadow-none text-gray hover:text-text-muted"
            >
              {lang.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Copy button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          className="ml-auto mr-4 text-gray hover:text-text-muted hover:bg-transparent"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Code content */}
      {languages.map((lang) => (
        <TabsContent
          key={lang.id}
          value={lang.id}
          className="p-6 overflow-x-auto text-left mt-0"
        >
          <pre className="font-mono text-sm leading-relaxed">
            <code>
              <SyntaxHighlight code={codeSnippets[lang.id]} />
            </code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  )
}

// Simple syntax highlighting component
function SyntaxHighlight({ code }: { code: string }) {
  const highlightCode = (text: string) => {
    const lines = text.split("\n")

    return lines.map((line, lineIndex) => {
      const parts: ReactNode[] = []
      let keyIndex = 0

      // Strings (single and double quotes)
      const strings = /(['"`])(?:(?!\1)[^\\]|\\.)*\1/g

      // Comments
      const comments = /(#.*$|\/\/.*$)/g

      // Process the line
      let lastIndex = 0
      const tokens: {
        start: number
        end: number
        type: string
        text: string
      }[] = []

      // Find all strings first
      let match
      while ((match = strings.exec(line)) !== null) {
        tokens.push({
          start: match.index,
          end: match.index + match[0].length,
          type: "string",
          text: match[0],
        })
      }

      // Find comments
      while ((match = comments.exec(line)) !== null) {
        tokens.push({
          start: match.index,
          end: match.index + match[0].length,
          type: "comment",
          text: match[0],
        })
      }

      // Sort tokens by position
      tokens.sort((a, b) => a.start - b.start)

      // Build the highlighted line
      tokens.forEach((token) => {
        if (token.start > lastIndex) {
          const beforeText = line.slice(lastIndex, token.start)
          parts.push(
            <span key={keyIndex++}>{highlightKeywords(beforeText)}</span>
          )
        }

        if (token.type === "string") {
          parts.push(
            <span key={keyIndex++} className="text-green">
              {token.text}
            </span>
          )
        } else if (token.type === "comment") {
          parts.push(
            <span key={keyIndex++} className="text-gray-dark">
              {token.text}
            </span>
          )
        }

        lastIndex = token.end
      })

      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(
          <span key={keyIndex++}>
            {highlightKeywords(line.slice(lastIndex))}
          </span>
        )
      }

      if (parts.length === 0) {
        parts.push(<span key={keyIndex++}>{highlightKeywords(line)}</span>)
      }

      return (
        <span key={lineIndex}>
          {parts}
          {lineIndex < lines.length - 1 && "\n"}
        </span>
      )
    })
  }

  const highlightKeywords = (text: string) => {
    const keywordList = [
      "import",
      "from",
      "const",
      "let",
      "var",
      "await",
      "async",
      "function",
      "return",
      "new",
      "using",
      "if",
      "else",
      "do",
      "end",
      "with",
      "as",
      "def",
      "class",
      "print",
    ]
    const keywordPattern = new RegExp(`\\b(${keywordList.join("|")})\\b`, "g")
    const parts = text.split(keywordPattern)

    return parts.map((part, i) => {
      if (keywordList.includes(part)) {
        return (
          <span key={i} className="text-yellow">
            {part}
          </span>
        )
      }
      return (
        <span key={i} className="text-text-muted">
          {part}
        </span>
      )
    })
  }

  return <>{highlightCode(code)}</>
}
