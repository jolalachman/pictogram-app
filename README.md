# Piktogramowa Aplikacja Mobilna do Budowania Wypowiedzi

## Opis
Aplikacja mobilna stworzona w technologii **Ionic** i **Angular**, której celem jest umożliwienie użytkownikom tworzenia wypowiedzi przy użyciu sekwencji piktogramów. Aplikacja została zaprojektowana z myślą o osobach, które mają trudności w komunikacji werbalnej, w tym osoby z autyzmem, afazją, a także dzieci uczące się podstawowych słów i zwrotów.

Użytkownicy mogą wybierać piktogramy z dostępnej biblioteki, łączyć je w sekwencje, tworząc w ten sposób proste komunikaty. System umożliwia zapisywanie stworzonych wypowiedzi, a także ich późniejsze odtwarzanie.

## Funkcjonalności:
- **Wybór piktogramów**: Użytkownicy mogą przeglądać różne kategorie piktogramów i wybierać je, aby zbudować wypowiedź.
- **Tworzenie sekwencji**: Po wybraniu piktogramów, użytkownicy mogą tworzyć sekwencje obrazków, które reprezentują logiczną wypowiedź.
- **Zapis i odtwarzanie**: Zbudowane wypowiedzi mogą być zapisane na później i odtwarzane w formie sekwencji wizualnej.
- **Prosty interfejs użytkownika**: Intuicyjny interfejs umożliwia łatwą nawigację po aplikacji, co jest szczególnie ważne dla użytkowników z różnymi potrzebami edukacyjnymi.
- **Dostosowanie do języka użytkownika**: Aplikacja może zostać dostosowana do różnych języków i lokalizacji poprzez prostą wymianę plików tłumaczeń.
- **Poprawa gramatyki przy użyciu OpenAI**: Aplikacja oferuje funkcjonalność automatycznej poprawy gramatycznej stworzonej wypowiedzi. Użytkownicy mogą wysyłać swoje sekwencje do OpenAI API, które analizuje tekst i proponuje poprawki gramatyczne. Funkcjonalność ta wspomaga poprawność wypowiedzi w przypadku użytkowników, którzy mają trudności w pisaniu pełnych zdań.

## Technologie:
- **Ionic**: Framework do tworzenia aplikacji mobilnych, który pozwala na budowanie aplikacji działających na systemy iOS oraz Android przy użyciu technologii webowych (HTML, CSS, JavaScript).
- **Angular**: Framework frontendowy, który wspiera rozwój aplikacji opartej na komponentach.
- **Firebase**: Używany do przechowywania danych użytkowników i zapisanych wypowiedzi w chmurze.
- **Piktogramy**: W aplikacji znajduje się zestaw piktogramów do wykorzystania w budowaniu wypowiedzi. Wykorzystane mogą być np. piktogramy z bibliotek takich jak **PictogramCom** czy **Widgit**.
- **OpenAI API**: Usługa do przetwarzania i analizy tekstu, wykorzystywana do poprawy gramatycznej tworzonych wypowiedzi.
