document.addEventListener('DOMContentLoaded', () => {
    const fromLanguage = document.getElementById('from-language');
    const toLanguage = document.getElementById('to-language');
    const sourceText = document.getElementById('source-text');
    const translatedText = document.getElementById('translated-text');
    const translateButton = document.getElementById('translate-button');
    const swapButton = document.getElementById('swap-button');

    const languages = {
        "af": "Afrikaans", "ak": "Akan", "sq": "Albanian", "am": "Amharic",
        "ar": "Arabic", "an": "Aragonese", "hy": "Armenian", "as": "Assamese",
        "av": "Avaric", "ae": "Avestan", "ay": "Aymara", "az": "Azerbaijani",
        "bm": "Bambara", "ba": "Bashkir", "eu": "Basque", "be": "Belarusian",
        "bn": "Bengali", "bh": "Bihari", "bi": "Bislama", "bs": "Bosnian",
        "br": "Breton", "bg": "Bulgarian", "my": "Burmese", "ca": "Catalan",
        "ch": "Chamorro", "ce": "Chechen", "zh": "Chinese(not working)",
        "cv": "Chuvash", "kw": "Cornish", "co": "Corsican", "cr": "Cree",
        "cs": "Czech", "cy": "Welsh", "da": "Danish", "de": "German",
        "dv": "Divehi", "dz": "Dzongkha", "el": "Greek", "en": "English",
        "eo": "Esperanto", "et": "Estonian", "fa": "Persian", "fj": "Fijian",
        "fi": "Finnish", "ff": "Fula", "gl": "Galician", "ka": "Georgian",
        "gd": "Scots Gaelic", "gu": "Gujarati", "ht": "Haitian Creole",
        "ha": "Hausa", "haw": "Hawaiian", "he": "Hebrew", "hi": "Hindi",
        "ho": "Hiri Motu", "hr": "Croatian", "hu": "Hungarian", "ia": "Interlingua",
        "id": "Indonesian", "ie": "Interlingue", "ig": "Igbo", "io": "Ido",
        "is": "Icelandic", "it": "Italian", "iu": "Inuktitut", "ja": "Japanese",
        "jv": "Javanese", "kl": "Kalaallisut", "kn": "Kannada", "kr": "Kanuri",
        "ks": "Kashmiri", "kk": "Kazakh", "km": "Central Khmer", "ki": "Kikuyu",
        "rw": "Kinyarwanda", "ky": "Kirghiz", "kv": "Komi", "kg": "Kongo",
        "ko": "Korean", "ku": "Kurdish", "kj": "Kwanyama", "la": "Latin",
        "lb": "Luxembourgish", "ln": "Lingala", "lo": "Lao", "lt": "Lithuanian",
        "lu": "Luba-Katanga", "lv": "Latvian", "gv": "Manx", "mk": "Macedonian",
        "mg": "Malagasy", "ms": "Malay", "ml": "Malayalam", "mt": "Maltese",
        "mi": "Maori", "mr": "Marathi", "mh": "Marshallese", "mn": "Mongolian",
        "na": "Nauru", "nv": "Navajo", "nb": "Norwegian Bokmål", "nd": "North Ndebele",
        "ne": "Nepali", "ng": "Ndonga", "nl": "Dutch", "nn": "Norwegian Nynorsk",
        "no": "Norwegian", "oc": "Occitan", "oj": "Ojibwa", "om": "Oromo",
        "or": "Oriya", "os": "Ossetian", "pa": "Punjabi", "pi": "Pali",
        "pl": "Polish", "ps": "Pashto", "pt": "Portuguese", "qu": "Quechua",
        "rm": "Romansh", "ro": "Romanian", "ru": "Russian", "sa": "Sanskrit",
        "sc": "Sardinian", "sd": "Sindhi", "se": "Northern Sami", "sm": "Samoan",
        "sg": "Sango", "sh": "Serbo-Croatian", "sr": "Serbian", "sn": "Shona",
        "si": "Sinhala", "sk": "Slovak", "sl": "Slovenian", "so": "Somali",
        "st": "Southern Sotho", "es": "Spanish", "su": "Sundanese", "sw": "Swahili",
        "sv": "Swedish"
    };

    // Populate language dropdowns
    for (const [code, name] of Object.entries(languages)) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        fromLanguage.appendChild(option.cloneNode(true));
        toLanguage.appendChild(option.cloneNode(true));
    }

    // Initial selections
    fromLanguage.value = 'en';
    toLanguage.value = 'es';

    translateButton.addEventListener('click', () => {
        const text = sourceText.value;
        const fromLang = fromLanguage.value;
        const toLang = toLanguage.value;

        if (text.trim() !== '') {
            fetch(`YOUR_API_ENDPOINT?text=${encodeURIComponent(text)}&from=${fromLang}&to=${toLang}`)
                .then(response => response.json())
                .then(data => {
                    translatedText.value = data.translatedText;
                })
                .catch(error => {
                    console.error('Error translating text:', error);
                    translatedText.value = 'Error translating text';
                });
        }
    });

    swapButton.addEventListener('click', () => {
        const tempText = sourceText.value;
        sourceText.value = translatedText.value;
        translatedText.value = tempText;

        // Swap the language dropdowns
        const tempLang = fromLanguage.value;
        fromLanguage.value = toLanguage.value;
        toLanguage.value = tempLang;
    });
});
