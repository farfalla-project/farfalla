echo "Extracting keys from javascript code"
# English
xgettext --omit-header --default-domain=javascript --language=Perl --keyword=_ --keyword=n_ --keyword=gettext_noop --keyword=gettext_lazy --keyword=ngettext_lazy --from-code=UTF-8 -o locales/en/LC_MESSAGES/javascript.pot languages/translations.catalog.js
# Italian
xgettext --omit-header --default-domain=javascript --language=Perl --keyword=_ --keyword=n_ --keyword=gettext_noop --keyword=gettext_lazy --keyword=ngettext_lazy --from-code=UTF-8 -o locales/it/LC_MESSAGES/javascript.pot languages/translations.catalog.js

echo "Merging new keys with existing keys"
# English
msgmerge --quiet --update locales/en/LC_MESSAGES/javascript.po locales/en/LC_MESSAGES/javascript.pot
# Italian
msgmerge --quiet --update locales/it/LC_MESSAGES/javascript.po locales/it/LC_MESSAGES/javascript.pot

echo "Converting message files to binary"
# English
msgfmt -v -o locales/en/LC_MESSAGES/javascript.mo  locales/en/LC_MESSAGES/javascript.po
# Italian
msgfmt -v -o locales/it/LC_MESSAGES/javascript.mo  locales/it/LC_MESSAGES/javascript.po

echo "Converting binary files to JSON"
# Usage:  mo2json.py domain . locale output-filename
# English
python mo2json.py javascript locales en languages/javascript.en.json
# Italian
python mo2json.py javascript locales it languages/javascript.it.json

echo Removing temp files
rm locales/en/LC_MESSAGES/javascript.pot
rm locales/en/LC_MESSAGES/javascript.po~
rm locales/it/LC_MESSAGES/javascript.pot
rm locales/it/LC_MESSAGES/javascript.po~