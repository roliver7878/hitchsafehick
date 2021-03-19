FROM python:3.8-slim-buster
WORKDIR /app
COPY /app /app
COPY ./requirements.txt /app
COPY wsgi.py .
RUN pip3 install -r /app/requirements.txt
EXPOSE 5000
CMD ["flask", "run"]