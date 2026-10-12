"""Verify rendered translations preserve every section, role, date, and source link."""
import hashlib
import json
import re
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
LOCALES = ['en', 'es', 'de', 'fr', 'nl', 'it', 'ja', 'zh-CN']
ORIGINAL_SHA256 = '2931985855c0150de459046749fe231f44db35ad34623377c62f076dbac50b9f'


def normalized(value):
    return re.sub(r'\s+', '', re.sub('[\u2010-\u2015\u2212]', '-', value))


def main():
    en = json.loads((ROOT / 'scripts/resume-content/en.json').read_text())
    for locale in LOCALES:
        path=ROOT / f'public/resume/luis-iturrios-resume-{locale}.pdf'
        reader=PdfReader(path)
        assert len(reader.pages)==2, f'{locale}: unexpected page count'
        text=normalized(''.join(p.extract_text() for p in reader.pages))
        if locale=='en':
            assert hashlib.sha256(path.read_bytes()).hexdigest()==ORIGINAL_SHA256, 'Original English PDF changed'
        else:
            assert reader.root_object['/Lang']==locale
            content=json.loads((ROOT / f'scripts/resume-content/{locale}.json').read_text())
            ui=json.loads((ROOT / f'src/i18n/{locale}/common.json').read_text())
            assert set(content)==set(en)
            for key in ['headline','summaryLabel','summary','skillsLabel','cloudLabel','cloud','softwareLabel','software','deliveryLabel','delivery','aiLabel','ai','productLabel','product','experienceLabel','kueskiRole','progression','mexicoCity','guadalajara','contract','projectsLabel','creator','sourceAuthor','desert1','desert2','desert3','source1','source2','source3','certificationsLabel','educationLabel','degree','translation','updated']:
                assert normalized(content[key]) in text, f'{locale}: missing or corrupted {key}'
            for key in ['foundingEngineer','staffEngineer','manager','lead','devopsEngineer','platformEngineer','productDeveloper','coordination','cofounderDeveloper','developer','present']:
                assert normalized(ui[key]) in text, f'{locale}: missing role {key}'
            def date(year, month):
                m=content['months'].split('|')[month-1]
                return f'{year}年{m}' if locale in ['ja','zh-CN'] else f'{m} {year}'
            # Verify each employment/certification range, not just the presence of its years.
            for start,end in [((2021,6),(2025,11)),((2024,10),(2025,11)),((2024,1),(2024,10)),((2022,1),(2024,1)),((2021,8),(2022,1)),((2021,6),(2021,8)),((2019,1),(2021,5)),((2018,7),(2018,12)),((2016,1),(2018,5)),((2014,5),(2016,1)),((2024,6),(2027,6))]:
                assert normalized(date(*start)+' - '+date(*end)) in text, f'{locale}: missing date range'
            assert normalized(date(2025,11)+' - '+ui['present']) in text
        for fact in ['Luis Iturrios','luisiturrios1@gmail.com','+52 656 116 4473','Aloi','Kueski','KIO Networks','SAT','centralSoft.com.mx','SAIT Software','Desierto de Altar GPS','python-cfdiclient','AWS DMS','GPX/KML','GPL-3.0','Associate','2012-2016','Universidad Tecnológica Metropolitana de San Luis Potosí']:
            assert normalized(fact) in text, f'{locale}: missing fact {fact}'
        uris=set()
        for page in reader.pages:
            for annotation in page.get('/Annots',[]):
                action=annotation.get_object().get('/A',{})
                if '/URI' in action:uris.add(str(action['/URI']))
        for url in ['https://www.linkedin.com/in/luisiturrios1/','https://github.com/luisiturrios1','https://desierto-de-altar-gps.web.app','https://apps.apple.com/app/id6788148149','https://play.google.com/store/apps/details?id=com.iturriosdev.desiertodealtar','https://github.com/luisiturrios1/python-cfdiclient']:
            assert url in uris, f'{locale}: missing source link {url}'
        print(f'{locale}: PDF content, dates, links and 2-page structure verified')

if __name__=='__main__':main()
