
(function(scope, doc){
    function new_progress_html(value) {
        var p_vid = doc.createElement('div');
        var progress = document.createElement('progress');
        p_vid.appendChild(progress);
        p_vid.setAttribute('class', 'progress-wrapper');
        progress.setAttribute('id', 'progressbar');
        progress.setAttribute('value', value);
        progress.setAttribute('max', '100');
        return p_vid
    }

    var tbody = document.getElementById('ltbody');
    var baseUrl = 'https://xtin.tintinlog.com';
    function process_dl_list(dl_list_obj) {
        if (dl_list_obj.status != 0) {
            return;
        }
        tbody.innerHTML = '';
        dl_list_obj.v.forEach(function(item){
            var row = tbody.insertRow(-1);
            var stage = row.insertCell(-1);
            switch (item.stage) {
                case 1:
                    stage.innerHTML = 'INIT';
                    [break;]
                case 2:
                    stage.innerHTML = 'DOWNLING';
                    [break;]
                case 3:
                    stage.innerHTML = 'UPLOADING';
                    [break;]
                case 4:
                    stage.innerHTML = 'UPLOADED';
                    [break;]
            }
            var name = row.insertCell(-1);
            name.innerHTML = item.title;
            var progress = row.insertCell(-1);
            progress.appendChild(new_progress_html(item.progress));
            var completion = row.insertCell(-1);
            completion.innerHTML = item.progress + '%'; 
            var size = row.insertCell(-1);
            size.innerHTML = item.size;
            var est_time = row.insertCell(-1);
            est_time.innerHTML = item.est_time;
            var speed = row.insertCell(-1);
            speed.innerHTML = item.speed;
        })
    }

    function get_list_info() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", baseUrl + '/dllist', true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var resText = xhr.responseText;
                var dl_list_obj = JSON.parse(resText);
                console.log(xhr.responseText);
                process_dl_list(dl_list_obj)
            }
        };
        xhr.send()
    }
    get_list_info();
    setInterval(get_list_info, 2000);

})(window, document);
