Zmergowałem dosyć duży PR, który uruchamia testowanie frontu - więc teraz, niestety, do napisanych komponentów, istniejących i przyszłych, będziecie musiały stworzyć działające testy. Wytłumaczę wam dlaczego te testy wyglądają tak, a nie inaczej, żebyście nie musiały tracić czasu na szukaniu informacji na ten temat.

Zobaczmy na plik `MeowdoptMeApp/__tests__/StartingScreen.test.tsx`.

Zaczyna się on dosyć niewinnie:

```TypeScript
// react-native
import 'react-native';
// narzędzia testowe
import {render, screen, fireEvent, act} from '@testing-library/react-native';
// wymagany import do testowania
import '@testing-library/jest-native/extend-expect';
// biblioteka, której używamy do pobierania danych z dany bazych
import axios from 'axios';
// plik, gdzie jest funkcja służąca do logowania
import * as authUtils from '../src/authUtils';
// będziemy chcieli renderować komponent App, ale w ogólności mogłyby
// być tutaj dowolne testowane komponenty
import App from '../App';
```

Dalej mamy już pierwsze straszne rzeczy. Są to tak zwane mocki, czyli funkcje, które podkładamy zamiast prawdziwych funkcji używanych przez nas, gdyż używanie ich do testów jednostkowych jest zbyt trudne/czasochłonne/niedeterministyczne. Pierwsze co mockujemy, to `react-native-webview`, bo z jakiegoś powodu nie działają z nim testy i szkoda mi czasu szukać powodu, dlaczego. Syntax jest następujący:

```
jest.mock(<nazwa modułu>, <funkcja, która zwraca to, co ma zawierać oszukańczy moduł>)
```

Zobaczymy to na poniższym przykładzie:

```TypeScript
// react-native-webview jest nieposłuszny do testów, więc go mockujemy
jest.mock('react-native-webview', () => {
  return {
    // używamy w kodzie metody WebView z tego modułu, więc definiujemy ją tutaj
    WebView: jest.fn(),
    // 'jest.fn()' to standardowy syntax na podkładanie funkcji,
    // nic konkretnego ta funkcja nie robi (jest "prawie" równoważna '() => {}')'
  };
});

// nie będziemy w testach jednostkowych łączyć się z bazą danych,
// więc będziemy oszukiwać, że to połączenie zachodzi
jest.mock('axios', () => {
  // pobieramy oryginalny moduł
  const originalModule = jest.requireActual('axios');
  return {
    // do podmienionego modułu wrzucamy wszystko z oryginalnego, korzystając
    // z operatora '...' (spread) wypakowującego obiekt
    ...originalModule,
    // ... ale nadpisujemy metodę post, tak, że ma nic nie robić (bo tylko z niej korzystamy)
    post: jest.fn(),
  };
});
```

Później mamy już pierwszy, właściwy test, ale najpierw wrócimy na chwilę do pliku `MeowdoptMeApp/__tests__/App.test.tsx`. Mamy tam następujący test:

```TypeScript
  it('renders', () => {
    render(<App />);
  });
```

Jest to bardzo prosty test. Funkcja `render` pochodzi z `@testing-library/react-native` i służy, jak sama nazwa wskazuje, do renderowania komponentow reacta-native w bardzo uproszczonym środowisku. Jedyne, co ten test sprawdza, to czy nasz komponent `<App/>` się renderuje. Jeśli będzie w nim coś nie tak (nie będzie możliwy render), to render zwróci błąd i test się nie powiedzie.

Przejdźmy do bardziej skomplikowanego przykładu, już z właściwego pliku (blok afterEach chwilowo pomińmy):

```TypeScript
it('is the current screen at launch', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('login/email')).toBeOnTheScreen();
  });

```

Widać, że nie różni się on zbyt wiele od poprzedniego przykładu. Ten test, jak sama nazwa wskazuje, sprawdza, czy po włączeniu aplikacji użytkownik trafia na ekran startowy. Nie jest to zbyt oczywiste jak to sprawdzić, więc to co robimy, to **sprawdzamy, czy konkretny komponent z drzewa ekranu startowego jest obecnie wyświetlany** w uproszczonym środowisku uruchomieniowym `render`. Jak to sprawdzimy?

Środowisko uruchomieniowe udostępnia obiekt `screen`, które jest niczym innym, jak reprezentacją tego, co jest obecnie wyświetlane. Z kolei na naszym ekranie startowym posiadamy pola do wpisywania tekstu. W jednym z nich placeholderem jest napis `login/email`. Szukamy więc komponentu, który ma taki placeholder:

```TypeScript
// zwraca komponent (jego reprezentację) z takim placeholderem
// lub rzuca błąd, jeśli nie znajdzie
screen.getByPlaceholderText('login/email');
```

Teraz oczekujemy, że ten komponent jest na ekranie (warunek spełnienia testu) korzystając z `expect()` oraz `toBeOnTheScreen()`.

Linijka:

```TypeScript
expect(screen.getByPlaceholderText('login/email')).toBeOnTheScreen();
```

Jest równoważna linii:

```TypeScript
const szukanyKomponent = screen.getByPlaceholderText('login/email');
expect(szukanyKomponent).toBeOnTheScreen();
```

Może nasunąć się pytanie - po co w takim razie to `toBeOnTheScreen()` skoro jak komponent nie zostanie odnaleziony, to będzie błąd?
Odpowiadam: nie wiem, choć się domyślam
(może chodzić komponenty które są w drzewie, ale są schowane przed użytkownikiem).

Ten test był stosunkowo prosty. Zwiększamy poziom trudności. Weźmy kolejny:

```TypeScript
it("goes to MainScreen when 'Skip' button is pressed", () => {
  render(<App />);
  act(() => {
    fireEvent(screen.getByText('Skip'), 'onPressOut');
  });

  expect(screen.getByText('Home')).toBeOnTheScreen();
});
```

Ten test, jak sama nazwa wskazuje, sprawdza, czy po naciśnięciu przycisku `Skip` przejdziemy do części właściwej aplikacji. Osiągniemy to, używając kolejnych dwóch metod z naszego środowiska uruchomieniowego, `act` oraz `fireEvent`. Zaczniemy od drugiego.

`fireEvent` to nic innego jak funkcja, która przekazuje do zadanego komponentu informację o tym, że zaszło jakieś wydarzenie. Tutaj w przykładzie, do komponentu z napisem `Skip`, czyli naszym przyciskiem, przekazujemy informację, że został naciśnięty (a konkretniej, że został puszczony - stąd `onPressOut`, a nie `onPress` - to dlatego, że przycisk `Skip` przechodzi do części właściwej aplikacji wtedy, kiedy użytkownik odpuści guzik).

No ale po co nam to `act` w takim razie? Dlatego, że przekazanie informacji to za mało. Chcemy jeszcze, żeby nasza aplikacja _zareagowała_ na to wydarzenie. Dlatego wszystko to owijamy w `act` idąc zgodnie ze schematem:
_przekaż wydarzenie_ -> _wymuś reakcję na nie_.

Syntax dla `act`:

```TypeScript
act(<funkcja, na której efekt wywołania ma zareagować aplikacja>)
```

Syntax dla `fireEvent`

```TypeScript
fireEvent(<komponent>, <wydarzenie>)
```

Na koniec sprawdzamy, czy teraz gdzieś na ekranie wyświetla się napis `Home`.

To było trudniejsze, ale wciąż proste. Podbijmy stawkę z kolejnym testem. Zwróćcie w nim szczególną uwagę na słowa kluczowe `async` i `await`, ale opowiem o nich na samym końcu przykładu.

```TypeScript
it("doesn't call 'login' when 'Login' button is pressed with incorrect data", async () => {
  const spy = jest.spyOn(authUtils, 'login');

  render(<App />);
  await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));

  expect(authUtils.login).not.toHaveBeenCalled();

  spy.mockRestore();
});
```

To, co ten test sprawdza, to czy **nie została** wywołana funkcja `login`, jeśli użytkownik wpisał złe dane do logowania. Jak to osiągnąć?
Skorzystamy z `jest.spyOn()`. Jest to bardzo przydatna funkcja, która sprawia, że `jest` się doczepia do wybranych funkcji i śledzi różne informacje z nimi związane - można dzięki temu zobaczyć ile razy funkcja została wywołana. Funkcja ta zwraca "obiekt szpiegujący", ale nie musimy go do niczego używać. Przydaje się on jednak do tego, żeby po tym szpiegowaniu posprzątać. Następujące kroki są dosyć naturalne:

```TypeScript
// w środowisku uruchomieniowym renderujemy aplikację
render(<App />);
// wymuszamy reakcję na naciśnięcie przycisku 'Login'
await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));
// spodziewamy się, że funkcja 'login' nie została wywołana
expect(authUtils.login).not.toHaveBeenCalled();
```

Na końcu mamy:
`spy.mockRestore();`, co po prostu "odszpiegowywuje" szpiegowaną funkcję.

Teraz - o co chodzi z tym `async` i `await`? Funkcja `login` jest funkcją asynchroniczną, bo w swojej zasadzie działania wysyła ona zapytanie do bazy danych i _czeka ustalony czas na odpowiedź, bądź jej brak_. W związku z tym nasz test musi być także asynchroniczny, bo inaczej nie będzie on czekał na wykonanie żadnych funkcji asynchronicznych i będzie je traktował, jakby nic nie robiły (bo nie zdążyły). Stąd mamy `async`.

Dalej w funkcji mamy `await act(...)`. Po co to, skoro już test jest funkcją asynchroniczną? Dlatego, że w funkcjach asynchronicznych wciąż możemy korzystać z funkcji synchronicznych i powinniśmy wyraźnie zaznaczyć, na co w nich będziemy czekać.

Teraz nasz test (funkcja) wie, że będzie musiał na coś czekać - i jest to odpowiednio oznaczone.

Krótkie wyjaśnienie do następnego testu:

```TypeScript
it("shows error message when 'Login' button is pressed with incorrect data", async () => {
  render(<App />);
  await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));

  expect(screen.getByText('Please fill in all fields')).toBeOnTheScreen();
});
```

Z poprzedniego testu wiemy, że przy nieprawidłowych danych funkcja `login` nie zostanie zawołana. W takim razie, dlaczego tutaj stosujemy `async` i `await`?
Z grzeczności i lenistwa. JavaScript nie wie, że te funkcje asynchroniczne, które mogłyby się wykonać nie będą jednak wykonane, więc będzie ostrzegał nas przed błędem. Jak się pozbyć takiego upierdliwego błędu?
W takiej sytuacji porządnym rozwiązaniem byłoby zamockowanie funkcji `login`, żeby już nie była asynchroniczna, ale to zdecydowanie za dużo, jak na tak prosty test i łatwiej jest zadeklarować tę funkcję jako asynchroniczną "na zapas".

Kolejny test tłumaczy zasadniczo sam siebie:

```TypeScript
it("calls 'login' when 'Login' button is pressed with correct data", async () => {
  // szpiegowanko
  const spy = jest.spyOn(authUtils, 'login');

  render(<App />);
  // wpisujemy do naszych pól tekstowych login oraz hasło
  // przy tym act nie musi być await, bo nie będzie w nim
  // wywołań żadnych funkcji asynchronicznych
  act(() => {
    // przekazujemy wydarzenie, że do pola tekstowego wpisano napis
    fireEvent(
      // znajduje pole odpowiednie pole tekstowe
      screen.getByPlaceholderText('login/email'),
      // podajemy wydarzenie
      'changeText',
      // podajemy treść tego wydarzenia (napis)
      'jest-test-login',
    );
    // to samo
    fireEvent(
      screen.getByPlaceholderText('password'),
      'changeText',
      'jest-test-password',
    );
  });
  // wymuszamy reakcję na naciśnięcie przycisku 'Login'
  await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));

  // spodziewamy się, że funkcja 'login' została wywołana
  expect(authUtils.login).toHaveBeenCalled();

  // sprzątanko
  spy.mockRestore();
});
```

Podnosimy poprzeczkę z kolejnym testem, który ma sprawdzać, czy po pomyślnym zalogowaniu dotarliśmy na ekran główny:

```TypeScript
  it('forwards to App after successful login', async () => {
    const spy = jest.spyOn(axios, 'post');
    spy.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          access: 'jest-mock-token',
        },
      });
    });

    render(<App />);
    act(() => {
      fireEvent.changeText(
        screen.getByPlaceholderText('login/email'),
        'jest-test-login',
      );
      fireEvent.changeText(
        screen.getByPlaceholderText('password'),
        'jest-test-password',
      );
    });
    await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));

    expect(axios.post).toHaveBeenCalled();
    expect(screen.getByText('Home')).toBeOnTheScreen();

    spy.mockRestore();
  });
```

Zwróćmy uwagę na ten fragment:

```TypeScript
spy.mockImplementationOnce(() => {
  return Promise.resolve({
    data: {
      access: 'jest-mock-token',
    },
  });
});
```

Wygląda dosyć makabrycznie, ale już spieszę z wyjaśnieniami. `jest.spyOn` poza zliczaniem liczby wywołań posiada całą rzeszę innych funkcjonalności. Między innymi to, że do szpiegowanej (mockowanej) funkcji można podłożyć własną implementację. Tutaj właśnie bardzo się nam to przyda. Nie będziemy przecież na potrzeby testu jednostkowego instalowali, konfigurowali i uzupełniali danymi naszej bazy danych. Zamiast tego **sprawimy, że metoda axios.post powiedzie się**. Wyjaśnienie syntaxu:

```TypeScript
spy.mockImplementation(<funkcja, która ma być wywołana zamiast 'oryginalnej'>);
```

Oczywiście `spy.mockImplementationOnce()` służy temu, żeby po jednym wywołaniu szpiegowanej funkcji jej zachowanie wróciło do oryginalnego - żeby się odmockowała.

Jak wygląda implementacja naszego mocka? `axios.post` jest funkcją, która zwraca **obietnicę** - czyli mówi, że coś kiedyś zwróci. Bez wchodzenia w zbędne szczegóły, nasza nowa implementacja zwraca **pomyślne spełnioną obietnicę** dostarczenia czegoś asynchronicznie. Funkcja `Promise.resolve()` dostaje jako argument treść obietnicy, czyli to co ma zwrócić poza informacją o sukcesie. Tutaj korzystamy z tego, że nasza baza danych w przypadku sukcesu logowania zwraca JSON w postaci:

```JSON
{
"data":
  {
  "access": <token>
  }
}
```

Dzięki temu funkcja `login` wywołana asynchronicznie dostanie informację, że obietnica się powiodła, czyli połączenie z bazą danych się udało. Dzięki temu wyjdzie z ekranu startowego, co możemy sprawdzić.

Kolejny test robi analogiczną rzecz - sprawdza, czy przy niepomyślnym zalogowaniu się wyświetlamy błąd. Jedyna różnica jest taka, że teraz mockujemy odrzucenie obietnicy, czyli błąd - korzystając z `Promise.reject()`;

```TypeScript
spy.mockImplementationOnce(() => {
  // w argumencie możemy podać treść odrzuconej obietnicy (błąd)
  return Promise.reject('jest-mock-error');
});
```

Dalsze testy są bardzo podobne do tych przedstawionych powyżej i ich analizę pozostawimy jako proste zadanie do wykonania w domu.

Zwróćcie uwagę na następujący syntax moich testów. Dobrze by było, żebyście też pisały je w ten sposób:

```TypeScript
it(..., () => {
  //setup

  //operations

  //check

  //teardown
})

// Przykład:
it('shows error message after unsuccessful login', async () => {
  // setup
  const spy = jest.spyOn(axios, 'post');
  spy.mockImplementationOnce(() => {
    return Promise.reject('jest-mock-error');
  });

  // operations
  render(<App />);
  fireEvent.changeText(
    screen.getByPlaceholderText('login/email'),
    'jest-test-login',
  );
  fireEvent.changeText(
    screen.getByPlaceholderText('password'),
    'jest-test-password',
  );
  await act(async () => fireEvent(screen.getByText('Login'), 'onPressOut'));

  // checks
  expect(axios.post).toHaveBeenCalled();
  expect(screen.getByText('jest-mock-error')).toBeOnTheScreen();

  // teardown
  spy.mockRestore();
});
```

Zwróćcie też uwagę na:

```TypeScript
afterEach(() => {
  jest.clearAllMocks();
});
```

jest to linijka, która powoduje wyczyszczenie wszystkich **implementacji** mocków po każdym teście - czyli np. moduł `axios` wciąż będzie mockowany, ale nie będzie już posiadał naszych implementacji. Po co to, skoro po każdym teście i tak sprzątamy? Z dwóch powodów: 0. możemy zapomnieć posprzątać wewnątrz testu, 0. test może crashować i nigdy nie dojść do etapu sprzątania.

To dlaczego by nie używać tylko i wyłącznie `afterEach`? Myślę, że dzięki temu testy są czytelniejsze, o ile sprzątania jest mało (istotnie mniej w porównaniu do treści właściwej testu). W przypadku, kiedy mocków jest bardzo dużo, wtedy rozsądnie jest korzystać tylko z `afterEach`.
