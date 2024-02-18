FROM python:3.11.5

WORKDIR /app

COPY requirements.txt requirements.txt
COPY poetry.lock .
COPY pyproject.toml .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "run.py"]