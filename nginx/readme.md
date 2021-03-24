
- [hosts和nginx配置详细对比](https://blog.csdn.net/belongtocode/article/details/103337882)

### host文件(管理员模式保存文件)

```
# 生产集群
39.96.148.188   suggest-ibot.yjyibot.aisino.com
39.96.148.188   web-adapter-ibot.yjyibot.aisino.com
39.96.148.188   console-ibot-test.yjyibot.aisino.com
39.96.148.188   kprj-ibot.yjyibot.aisino.com
39.96.148.188   kprj-announce-ibot.yjyibot.aisino.com

# 测试集群
172.16.5.67     web-adapter.test.aisino.com
172.16.5.67     economist-ibot.test.aisino.com
172.16.5.67     kprj-ibot.aitest.aisino.com
172.16.5.67     kprj-announce-ibot.aitest.aisino.com

```

### nginx配置文件

```
# 生产集群
upstream gunicorn {
    server web-adapter-ibot.yjyibot.aisino.com;
}

upstream economist {
    server economist-ibot.yjyibot.aisino.com;
}

upstream suggest {
    server suggest-ibot.yjyibot.aisino.com;
}

upstream kprj {
#    server kprj-ibot.yjyibot.aisino.com;
     server kprj-ibot.yjyibot.aisino.com;
}

upstream kprj-an {
    server kprj-announce-ibot.yjyibot.aisino.com;
}


server {
    listen 8000 default_server;
    server_name _;

    access_log /xxx/access.log main;
    error_log /xxx/error.log;

    root /THE CODE DIST;
    client_max_body_size 10M;
    # 然后在api代理中，加入这几个根地址，
    # backend URLs
    location /api {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "web-adapter-ibot.yjyibot.aisino.com";

        proxy_pass http://gunicorn;
    }

    location /api/internal {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "economist-ibot.yjyibot.aisino.com";

        proxy_pass http://economist;
    }

    location /suggest {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "suggest-ibot.yjyibot.aisino.com";
        rewrite /suggest/ /api/corpus/v2/topicsv2/ break;
        proxy_pass http://suggest;
    }

    location /kprj-api {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "kprj-ibot.yjyibot.aisino.com";

        rewrite /kprj-api/(.*)$ /kprj/$1 break;
        proxy_pass http://kprj;
    }

    location /kprj-an-api {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "kprj-announce-ibot.yjyibot.aisino.com";

        rewrite /kprj-an-api/(.*)$ /blog/$1 break;
        proxy_pass http://kprj-an;
    }

    location ~ \.(css|js)\.map$ {
        return 403;
    }

    # all others are managed by FrontEnd
    location / {
        expires 5m;
        add_header Pragma public;
        add_header Cache-Control "public, must-revalidate, proxy-revalidate";
        try_files $uri $uri/ /index.html =404;
    }
}


```

```

# 测试集群
upstream gunicorn {
    server web-adapter.test.aisino.com:8080;
}

upstream economist {
    server economist-ibot.test.aisino.com:8080;
}

upstream suggest {
    server suggest-ibot.yjyibot.aisino.com;
}

upstream kprj {
#    server kprj-ibot.yjyibot.aisino.com;
     server kprj-ibot.aitest.aisino.com:8080;
}

upstream kprj-an {
    server kprj-announce-ibot.aitest.aisino.com:8080;
}

server {
    listen 8000 default_server;
    server_name _;

    access_log /xxx/access.log main;
    error_log /xxx/error.log;

    root /THE CODE DIST;
    client_max_body_size 10M;

    # backend URLs
    location /api {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "web-adapter.test.aisino.com";

        proxy_pass http://gunicorn;
    }

    location /api/internal {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "economist-ibot.test.aisino.com";

        proxy_pass http://economist;
    }

    location /suggest {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "suggest-ibot.yjyibot.aisino.com";
        rewrite /suggest/ /api/corpus/v2/topicsv2/ break;
        proxy_pass http://suggest;
    }

    location /kprj-api {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "kprj-ibot.aitest.aisino.com";

        rewrite /kprj-api/(.*)$ /kprj/$1 break;
        proxy_pass http://kprj;
    }

    location /kprj-an-api {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_set_header Host "kprj-announce-ibot.aitest.aisino.com";

        rewrite /kprj-an-api/(.*)$ /blog/$1 break;
        proxy_pass http://kprj-an;
    }

    location ~ \.(css|js)\.map$ {
        return 403;
    }

    # all others are managed by FrontEnd
    location / {
        expires 5m;
        add_header Pragma public;
        add_header Cache-Control "public, must-revalidate, proxy-revalidate";
        try_files $uri $uri/ /index.html =404;
    }
}

```