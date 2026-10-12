"""Render the seven translations of the canonical English résumé (never overwrite it).

Requires reportlab and pypdf. Font directory can be supplied with --font-dir.
Translation copy lives in resume-content/*.json; roles use the website dictionaries.
"""
import argparse
import json
import re
import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject

ROOT = Path(__file__).resolve().parent.parent
LOCALES = ['es', 'de', 'fr', 'nl', 'it', 'ja', 'zh-CN']
LINKS = {
    'LinkedIn': 'https://www.linkedin.com/in/luisiturrios1/',
    'GitHub': 'https://github.com/luisiturrios1',
    'Portfolio': 'https://luisiturrios1.github.io/resume',
    'App Store': 'https://apps.apple.com/app/id6788148149',
    'Google Play': 'https://play.google.com/store/apps/details?id=com.iturriosdev.desiertodealtar',
    'credential': 'https://www.credly.com/badges/1b5cb384-a727-4694-bd25-77196f016aa3/linked_in_profile',
}
BLUE = colors.HexColor('#24465c')
INK = colors.HexColor('#19262e')
GRAY = colors.HexColor('#52616b')
GREEN = colors.HexColor('#82ad57')


def clean(text):
    return re.sub('[\u2010-\u2015\u2212]', '-', text)


def link(label, url):
    return f'<a href="{escape(url, {chr(34): "&quot;"})}" color="#24465c">{escape(clean(label))}</a>'


def render(locale, fonts, output):
    d = json.loads((ROOT / f'scripts/resume-content/{locale}.json').read_text())
    en = json.loads((ROOT / 'scripts/resume-content/en.json').read_text())
    assert set(d) == set(en), f'Incomplete PDF translation: {locale}'
    assert all(isinstance(v, str) and v.strip() for v in d.values())
    ui = json.loads((ROOT / f'src/i18n/{locale}/common.json').read_text())
    cjk = locale in ['ja', 'zh-CN']
    regular = 'ResumeCJK' if cjk else 'ResumeArial'
    bold = regular if cjk else 'ResumeArialBold'
    # Ensure every translated character is embedded, rather than relying on font fallback.
    glyphs = pdfmetrics.getFont(regular).face.charToGlyph
    text = ''.join(d.values()) + ''.join(ui[k] for k in ['foundingEngineer', 'present', 'staffEngineer', 'manager', 'lead', 'devopsEngineer', 'platformEngineer', 'productDeveloper', 'coordination', 'cofounderDeveloper', 'developer'])
    missing = {c for c in clean(text) if not c.isspace() and ord(c) not in glyphs}
    assert not missing, f'Unsupported glyphs in {locale}: {missing}'
    base = dict(fontName=regular, fontSize=9.7, leading=13.4, textColor=INK, alignment=TA_LEFT, wordWrap='CJK' if cjk else None)
    styles = {
        'body': ParagraphStyle('body', **base, spaceAfter=5),
        'small': ParagraphStyle('small', **{**base, 'fontSize': 8.5, 'leading': 11.8, 'textColor': GRAY}, spaceAfter=4),
        'role': ParagraphStyle('role', **{**base, 'fontName': bold, 'fontSize': 10.4, 'leading': 14}, spaceBefore=7, spaceAfter=2),
        'section': ParagraphStyle('section', **{**base, 'fontName': bold, 'fontSize': 12.8, 'leading': 16.5, 'textColor': BLUE}, spaceBefore=11, spaceAfter=7, keepWithNext=True),
        'bullet': ParagraphStyle('bullet', **base, leftIndent=10, firstLineIndent=-8, spaceAfter=6),
        'name': ParagraphStyle('name', **{**base, 'fontName': bold, 'fontSize': 28, 'leading': 34}, spaceAfter=6),
    }
    def p(text, style='body', markup=False):
        return Paragraph(clean(text) if markup else escape(clean(text)), styles[style])
    def heading(key):
        return p(d[key], 'section')
    def date(year, month):
        m=d['months'].split('|')[month-1]
        return f'{year}年{m}' if cjk else f'{m} {year}'
    def period(start, end=None):
        return f'{date(*start)} - {date(*end) if end else ui["present"]}'
    story = [p('Luis Iturrios', 'name'), p(d['headline'], 'role'),
             p(f'San Luis Río Colorado, Sonora, {d["country"]} · {d["remote"]}', 'small'),
             p(link('luisiturrios1@gmail.com', 'mailto:luisiturrios1@gmail.com')+' · +52 656 116 4473', 'small', True),
             p(' · '.join(link(k,LINKS[k]) for k in ['LinkedIn','GitHub'])+' · '+link(ui['portfolioEdition'].split(' / ')[0].title(),LINKS['Portfolio']), 'small', True),
             heading('summaryLabel'), p(d['summary']), heading('skillsLabel')]
    for k in ['cloud','software','delivery','ai','product']:
        story.append(p(f'<font name="{bold}">{escape(d[k+"Label"])}:</font> {escape(d[k])}', markup=True))
    story.append(heading('experienceLabel'))
    def employer(name, role, dates, location, extra=None):
        parts=[p(f'{name} - {role}', 'role'),p(f'{dates} · {location}', 'small')]
        if extra: parts.extend(extra)
        story.append(KeepTogether(parts))
    employer('Aloi',ui['foundingEngineer'],period((2025,11)),d['remote']+', '+d['country'])
    progression=[p(d['progression'], 'small')]
    for key,start,end in [
        ('staffEngineer',(2024,10),(2025,11)),('manager',(2024,1),(2024,10)),
        ('lead',(2022,1),(2024,1)),('devopsEngineer',(2021,8),(2022,1)),('platformEngineer',(2021,6),(2021,8))]:
        progression.append(p(f'{ui[key]}: {period(start,end)}', 'small'))
    employer('Kueski',d['kueskiRole'],period((2021,6),(2025,11)),d['country'],progression)
    employer('KIO Networks',ui['productDeveloper'],period((2019,1),(2021,5)),d['mexicoCity'])
    employer('SAT',ui['coordination'],period((2018,7),(2018,12)),d['mexicoCity']+' · '+d['contract'])
    employer('centralSoft.com.mx',ui['cofounderDeveloper'],period((2016,1),(2018,5)),d['guadalajara'])
    employer('SAIT Software',ui['developer'],period((2014,5),(2016,1)),'San Luis Río Colorado, Sonora')
    story.extend([PageBreak(), heading('projectsLabel'),p('Desierto de Altar GPS - '+d['creator'], 'role'),
                  p(' · '.join([link(d['website'],'https://desierto-de-altar-gps.web.app'),link('App Store',LINKS['App Store']),link('Google Play',LINKS['Google Play'])]), 'small',True)])
    for n in range(1,4): story.append(p('- '+d[f'desert{n}'],'bullet'))
    story.extend([Spacer(1,6),p('python-cfdiclient - '+d['sourceAuthor'],'role'),p(link(d['repository'],'https://github.com/luisiturrios1/python-cfdiclient'),'small',True)])
    for n in range(1,4): story.append(p('- '+d[f'source{n}'],'bullet'))
    story.append(heading('certificationsLabel'))
    # Official credential titles and issuers remain exact proper names.
    story.extend([p('AWS Certified Solutions Architect - Associate · Amazon Web Services', 'role'),
                  p(period((2024,6),(2027,6))+' · '+link(ui['credential'],LINKS['credential']),'small',True),
                  p('SCRUM Master Accredited Certification · International Scrum Institute.', 'body'),
                  p('SDP07 Human/Computer Interaction & Communication · Carnegie Mellon University.', 'body'),
                  heading('educationLabel'),p(d['degree'],'role'),
                  p('Universidad Tecnológica Metropolitana de San Luis Potosí · 2012-2016','body')])
    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(GREEN);canvas.rect(42,A4[1]-24,A4[0]-84,2,fill=1,stroke=0)
        canvas.setStrokeColor(colors.HexColor('#dce2e5'));canvas.line(42,39,A4[0]-42,39)
        canvas.setFont(regular,7.2);canvas.setFillColor(GRAY)
        canvas.drawString(42,27,clean(d['translation']+' · '+d['updated']))
        canvas.drawRightString(A4[0]-42,27,f'{d["page"]} {doc.page}')
        canvas.restoreState()
    output.mkdir(parents=True,exist_ok=True)
    tmp=ROOT/f'tmp/pdfs/{locale}-draft.pdf';tmp.parent.mkdir(parents=True,exist_ok=True)
    doc=SimpleDocTemplate(str(tmp),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=35,bottomMargin=51,title=f'Luis Iturrios - {ui["resume"]}',author='Luis Iturrios',invariant=1)
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    reader=PdfReader(tmp)
    assert len(reader.pages)==2,f'{locale}: expected two pages, got {len(reader.pages)}'
    writer=PdfWriter();writer.clone_document_from_reader(reader)
    writer.root_object[NameObject('/Lang')]=TextStringObject(locale)
    writer.add_metadata({'/Title':f'Luis Iturrios - {ui["resume"]}', '/Author':'Luis Iturrios','/Subject':d['translation'],'/Keywords':f'resume, {locale}, English source, October 2026'})
    target=output/f'luis-iturrios-resume-{locale}.pdf'
    with target.open('wb') as f:writer.write(f)
    dest=ROOT/'public/resume'/target.name
    if dest.resolve()!=target.resolve():shutil.copyfile(target,dest)
    print(f'{locale}: 2 pages, {target.stat().st_size:,} bytes')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--font-dir',type=Path,default=Path('/System/Library/Fonts/Supplemental'))
    parser.add_argument('--output-dir',type=Path,default=ROOT/'output/pdf')
    args=parser.parse_args()
    for name,file in [('ResumeArial','Arial.ttf'),('ResumeArialBold','Arial Bold.ttf'),('ResumeCJK','Arial Unicode.ttf')]:
        pdfmetrics.registerFont(TTFont(name,str(args.font_dir/file)))
    for locale in LOCALES:render(locale,args.font_dir,args.output_dir)

if __name__=='__main__':main()
