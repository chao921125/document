```text
server {
    set $index index.html;
    set $root /test/;

    listen 80;
    access_log off;
    error_log off;

    location ~ ^/index.html {
        root $root;
        add_header Cache-Control no-cache;
        add_header Cache-Control no-store;
        add_header Cache-Control must-revalidate;
        add_header Pragma no-cache;
        add_header Expires 0;
    }

    location /  {
        root $root;
        try_files $uri @fallback;
    }

    location @fallback  {
        root $root;
        rewrite ^ /index.html break;
        add_header Cache-Control no-cache;
        add_header Cache-Control no-store;
        add_header Cache-Control must-revalidate;
        add_header Pragma no-cache;
        add_header Expires 0;
    }
}

```
