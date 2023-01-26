## Проект протестирован на утечки памяти

Источники: материалы курса и дополнительные источники:
- [первый](https://habr.com/ru/company/yandex/blog/195198/)
- [второй](https://blog.bullgare.com/2014/09/%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D1%83%D1%82%D0%B5%D1%87%D0%B5%D0%BA-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D1%87%D0%B5%D1%80%D0%B5%D0%B7-google-chrome/)

На вкладке Performance было сделано несколько записей и проанализированы следующие показатели:

- JS Heap (куча)
- Nodes
- Listeners

В результате действий на сайте в течении 120 секунд было выявлено:

- размер кучи изменяется от 30 до 40 MБ в зависимости от открытой страницы, восходящего тренда не наблюдается, минимальные показатели достигаются на главной странице
- кол-во узлов колеблется от 2000 до 4000, восходящего тренда не наблюдается, минимальные показатели достигаются на главной странице
- кол-во слушателей от 350 до 1200, восходящего тренда не наблюдается, минимальные показатели достигаются на главной странице

Отсутствие восходящего тренда в приведенных показателя является следствием корректной работы сборщика мусора и отсутствием утечек в проекте.

Проведенный анализ Snapshot во вкладке Memory, сделанных на разных страницах  также не выявил утечек.

Вывод: утечки в проекте не обнаружены.