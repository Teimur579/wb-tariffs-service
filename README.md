# Данное решение это MVP сервис, который реализует логику обращения по расписанию к маркетплейсу Wildberries через заданный Endpoint, получает и ежедневно накапливает в базе данных информацию, получаемую по api, и выдает ее в произвольное количество google-таблиц.

# Установка и запуск
1. **Клонируйте репозиторий:**

```bash
git clone https://github.com/Teimur579/wb-tariffs-service.git
cd wb-tariffs-service
```

2. **Создайте файл .env на основе шаблона:**

```bash
cp .env.example .env
```
Заполните файл .env своими значениями (ключи доступа к БД и Google API).
Предоставляю для упрощения сразу мои ключи:

.env:
```bash
PORT=3000
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
DB_PORT=5432
WB_API_URL=https://common-api.wildberries.ru/api/v1/tariffs/box
WB_API_KEY=eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwNTIwdjEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTc2NTY3MDIyOSwiaWQiOiIwMTk3NmU0Yy1mZTgwLTc1NDAtODkyMi02NGE5ZWUzYTU4MzYiLCJpaWQiOjQ1OTExNjA5LCJvaWQiOjExMzA0NiwicyI6MTA3Mzc0MTgzMiwic2lkIjoiOTMyYzE3NmEtNTA4NS01YzZmLWJjMzMtNGU4NGNkZjU4ZDdlIiwidCI6ZmFsc2UsInVpZCI6NDU5MTE2MDl9.wDoH8FLdZu1049uPCmhx3UHaw28YJB-CylWeD2LgkpRZFIMlOsUlnlVmfmYKy__JWNjfbDkOtdJ69QpSD5EKag
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAq9aXst/XQ1eE\nbLWdLXsS2HclOkvsCQ8UxmnZF99hj5bK8P0eU7pMelkT/tBoria8htRcXyucUO3f\nX429A5cQnu5DB41nmwcquzrhn7bCwd/OPT5vQVRjs9ZZfnYWxiftSy/Xn5Ec/UjA\ngX56t7XtWzubDk5B9Y7iUbGMgQBsRhIYCduALgPE9+KHo9DJNMkAAOylsNpbpiRZ\nfgkOQxrngvnn0DDcCIvmzyFpvcvtNqiL8ylJKkWDxYYFzZdkt43t5WBHG1YgLWIQ\nwUB/+9YYRC+Sf//B5SSONY3Ch4Wnt1+XeRSvqlks7rEFuyy22d+823Uz0D6xV2qg\nFQa3Z5/hAgMBAAECggEAEUeYEF+M2cEtY9qyvcJVdmQ5k09+KFDLrHZQX0BX2r0b\nrgnHpGT9TAdGXpe3g0aTLMypgRCmraHzI4RuBtSqmLqtmGS2AY5oKc9EQaCnAyKL\nevNdL8cxKrFMo8FxaoDNFegXW1mb6c4BggUFyJBvXYvqyvDmgzM4ZFh6pE+cL8Q/\nk26IPR7iX9BGpcORUkJMRMPINvDGh761ndeF4eAOpAOhUz3LzehyNDHvnu808HqO\n5duS01Kxgj5FPWbMlP90QEuUvqf5uOdr3+HypSa1rirMboVDS3batSilrkuGbdyX\nj1mb1KwFo0JLJDsJRBByo8UELOG9DpfUUEEfz/j1XQKBgQD6Rs8AB/+ngzzSEvAs\n1VaN5Lac3OALBgrG6x8BtTNaqjzZ4KhyBh1oqy3UhWCLKefNWEgKhCcXOHESMmIG\n0JxeVuQEBvEqKgiseTpl/g8pNofmyCKFH9HLPQBCggJp3yDxxP/X38zLD+Z1alJS\nC6y3Dl7ZbSMgxXC+EVbV0///ywKBgQDFE8qSuB0xWqFVGKlJBJhcVgsZpL0ARGgo\nbhqSnlSlghfTgghElyjoZ/oo81cPJz6QnjnrulzLcT8iFoWRUDPtu0d3l7jMAFB9\n0Gq83xoCMj9MwSyEX0kD65+H5a9W7bH+yguwigKXmJmOs3zS+/B04NnY1GZUIfUY\nQAywKlnRgwKBgC9IA0ExQaYG0A2r0D3YC+MAi1M1EwpiGNUdhB0Re2MseBR9MbVg\n3Ftyw1S74dJIl2cev3VlI/FqE0ppxEUfUfsslSUBnrvldwAGYvbzuS+DAsehlYvq\nx/qKSqtF3mjb42BpZCAHQqw2E8ao0GZ5mCZ5C4gt6w383uC5a9s3ksxjAoGAZYLd\nPBejydEx+qAaSmcYh682Rn4pcCLMN88G1vDBDwNkfGilE5d81cEBBOjatg5z1o/5\nq6cxtwTdDRTmtcPHC7QEiuBWqpWa4ENjR2fvgKQbIND7ui9Ob7uFT72KRE9o+KFf\nxg5AaY+LwQpIyHBHGhzbeSlmj/1xvoz3PCKEYzsCgYEAgwMsmx+pxklW3mBtuNdA\nHqlpR7T25H1tciNbHl5pgRWsh9UyUsHRb+dWbbjNe4c1b90YRoAL5+t8+daXLFgI\nPyIY3ywTzbbK/BzOkK+m4QxZZqjzO9gSTn+Sdpm6tfHyvpkro6bgwkmWxUZNWBPX\n1uzAgkm2lWUUAsyIS6DsAX8=\n-----END PRIVATE KEY-----\n"
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=tid11a@wb-tariffs.iam.gserviceaccount.com
SPREADSHEET_ID=1opOW02paHQ3LjFWuEsBWLG_PjFGwyNnXvtN3LfkGBj4
```

3. **Запустите проект через Docker Compose:**

```bash
docker compose -f 'docker-compose.yaml' up -d --build
```

***После сборки:***

*-сервер будет доступен на http://localhost:3000*
*-PostgreSQL поднимется в контейнере и автоматически применятся миграции*

# Пример выгрузки данных в spreadsheet
![Скриншот пример](screenshot.png)