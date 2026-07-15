import re
import os

lines = open('terms_temp.txt', 'r', encoding='utf-8').read().split('\n')
sections = []
current_section = None

for line in lines:
    line = line.strip()
    if not line: continue
    
    # Check if top-level section header
    # e.g., "1. Introduction" or "END-CUSTOMER ORDERING TERMS"
    if re.match(r'^(\d+\.\s+|END-CUSTOMER ORDERING TERMS)', line):
        if current_section:
            sections.append(current_section)
        current_section = {'title': line, 'lines': []}
    elif current_section:
        current_section['lines'].append(line)
    else:
        # Before first section (e.g. title, date)
        if not current_section:
            current_section = {'title': 'Effective Date', 'lines': []}
        current_section['lines'].append(line)

if current_section:
    sections.append(current_section)

def format_lines(lines):
    html = []
    in_list = False
    for i, line in enumerate(lines):
        line_clean = line.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        
        # Check if subheading like "4.1 Authorised User"
        if re.match(r'^\d+\.\d+\s+', line):
            if in_list:
                html.append('</ul>')
                in_list = False
            html.append(f'<h3 className="font-bold text-lg mt-4 mb-2">{line_clean}</h3>')
            continue

        # Heuristic for list item
        is_list_item = False
        if in_list:
            if line.endswith(';') or line.endswith('; and') or line.endswith('; or'):
                is_list_item = True
            elif i > 0 and lines[i-1].endswith(';') and line.endswith('.'):
                is_list_item = True
        else:
            if i > 0 and lines[i-1].endswith(':'):
                is_list_item = True
                
        if is_list_item:
            if not in_list:
                html.append('<ul className="list-disc pl-5 flex flex-col gap-1 mb-4">')
                in_list = True
            html.append(f'<li>{line_clean}</li>')
        else:
            if in_list:
                html.append('</ul>')
                in_list = False
            
            # Identify bold paragraphs like "Registered office:" etc.
            if ":" in line_clean and len(line_clean.split(":")[0]) < 30 and not line_clean.endswith(":"):
                # Make the part before colon bold
                parts = line_clean.split(":", 1)
                line_clean = f"<strong>{parts[0]}:</strong>{parts[1]}"

            html.append(f'<p className="mb-2">{line_clean}</p>')
            
    if in_list:
        html.append('</ul>')
        
    return '\n        '.join(html)

tsx_sections = []
for sec in sections:
    body_html = format_lines(sec['lines'])
    title = sec['title'].replace('"', '\\"')
    tsx_sections.append(f"""  {{
    title: "{title}",
    body: (
      <div className="flex flex-col">
        {body_html}
      </div>
    )
  }}""")

sections_joined = ',\n'.join(tsx_sections)
tsx_content = f"""import type {{ Metadata }} from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {{
  title: "Terms of Service — Ordrji",
  description: "Read the Terms of Service governing your use of the Ordrji platform.",
}};

const SECTIONS = [
{sections_joined}
];

export default function TermsPage() {{
  return (
    <LegalPage
      badge="Legal"
      title="Terms of Service"
      subtitle="Please read these terms carefully before using the Ordrji platform."
      lastUpdated="15 July 2026"
      sections={{SECTIONS}}
    />
  );
}}
"""

open('src/app/terms/page.tsx', 'w', encoding='utf-8').write(tsx_content)
print("Successfully generated src/app/terms/page.tsx")
