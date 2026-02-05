import { useState, type ReactNode } from "react"
import { Copy, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const languages = [
  { id: "python", label: "Python" },
  { id: "nodejs", label: "NodeJS" },
  { id: "php", label: "PHP" },
  { id: "ruby", label: "Ruby" },
  { id: "csharp", label: "C#" },
  { id: "curl", label: "cURL" },
] as const

type LanguageId = (typeof languages)[number]["id"]

const codeSnippets: Record<LanguageId, string> = {
  python: `import requests

response = requests.post(
    'https://api.example.com/v1/pdf',
    headers={'X-API-Key': 'pk_live_xxxxxxxxxx'},
    json={"html": "<h1>Hello World</h1>"}
)

response.raise_for_status()

with open('document.pdf', 'wb') as f:
    f.write(response.content)`,

  nodejs: `const response = await fetch(
    'https://api.example.com/v1/pdf',
    {
        method: 'POST',
        headers: {
            'X-API-Key': 'pk_live_xxxxxxxxxx',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            html: '<h1>Hello World</h1>'
        }),
    }
);

const pdf = await response.arrayBuffer();
fs.writeFileSync('document.pdf', Buffer.from(pdf));`,

  php: `$response = Http::withHeaders([
    'X-API-Key' => 'pk_live_xxxxxxxxxx',
])->post('https://api.example.com/v1/pdf', [
    'html' => '<h1>Hello World</h1>',
]);

file_put_contents(
    'document.pdf',
    $response->body()
);`,

  ruby: `response = HTTParty.post(
    'https://api.example.com/v1/pdf',
    headers: {
        'X-API-Key' => 'pk_live_xxxxxxxxxx'
    },
    body: {
        html: '<h1>Hello World</h1>'
    }.to_json,
    format: :plain
)

File.open('document.pdf', 'wb') do |f|
    f.write(response.body)
end`,

  csharp: `using var client = new HttpClient();

client.DefaultRequestHeaders.Add(
    "X-API-Key",
    "pk_live_xxxxxxxxxx"
);

var response = await client.PostAsJsonAsync(
    "https://api.example.com/v1/pdf",
    new { html = "<h1>Hello World</h1>" }
);

var pdf = await response.Content.ReadAsByteArrayAsync();
File.WriteAllBytes("document.pdf", pdf);`,

  curl: `curl -X POST https://api.example.com/v1/pdf \\
    -H "X-API-Key: pk_live_xxxxxxxxxx" \\
    -H "Content-Type: application/json" \\
    -d '{"html": "<h1>Hello World</h1>"}' \\
    -o document.pdf`,
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
