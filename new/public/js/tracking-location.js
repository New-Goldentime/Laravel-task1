let g_myTourLogIds = []; // GPS送信ログID

jQuery(document).ready(function () {

    if (g_myTourLogIds > 0) {
        setInterval(function() {
            const d = new Date();
            let seconds = d.getSeconds();
            if (seconds === 0) {
                getMyLocation(function(retCode, location) {
                    if (retCode === -1) {
                        console.warn("現在地の取得が失敗しました。\n現在地の取得を許可してください。");
                        return;
                    }
                    if (retCode === -2) {
                        console.warn("現在地の取得が失敗しました。\n最新ブラウザをご利用ください。");
                        return;
                    }
                    submitMyLocation(location['lat'], location['lng']);
                });
            }

            if (d.getMinutes() === 0 && seconds === 0) {
                // １時間ごとにGPS送信状態をアラートする
                alert(g_myTourLogIds.length + "件の契約案件に対してGPS送信中です。");
            }
        }, 950/*ms*/)
    }

});

/**
 * 現在地を取得する（経緯度）
 *
 * @param callbackFunc (retCode, location)
 * @return void
 */
function getMyLocation(callbackFunc) {

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                callbackFunc(0/*success*/, {
                    //lat: 35.18475, lng: 136.899688
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            () => {
                //alert('現在地の取得が失敗しました。');
                callbackFunc(-1/*failed*/, null);
            }
        );
    } else {
        // Browser doesn't support Geolocation
        //alert("現在地の取得が失敗しました。\n最新ブラウザをご利用ください。");
        callbackFunc(-2/*unsupported*/, null);
    }
}

/**
 * 現在地を送信する
 *
 * @param lat
 * @param lng
 */
function submitMyLocation(lat, lng) {
    $.ajax({
        method: "post",
        url: TRACKING_PROCESS_URL,
        dataType: 'json',
        data: {
            'command': 'record',
            'lat': lat,
            'lng': lng,
            'log_ids': g_myTourLogIds
        },
        success: function(data) {

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.warn('現在地の送信が失敗しました！');
        }
    });
}

/**
 * GPS送信開始
 */
function startTracking() {
    // GPS位置取得を試す
    getMyLocation(function(retCode, location) {
        if (retCode === -1) {
            alert("現在地の取得が失敗しました。\n現在地の取得を許可してください。");
            return;
        }
        if (retCode === -2) {
            alert("現在地の取得が失敗しました。\n最新ブラウザをご利用ください。");
            return;
        }

        submitTrackingCommand({
            command: 'start',
            lat: location['lat'],
            lng: location['lng']
        })
    });
}

/**
 * GPS送信関連の処理コマンドを提出する
 * @param params
 */
function submitTrackingCommand(params) {
    let frm = $("#frm-tracking");
    $("input.optional", frm).val('');
    for (let paramId in params) {
        $("input[name=" + paramId + "]", frm).val(params[paramId]);
    }
    frm.submit();
}
