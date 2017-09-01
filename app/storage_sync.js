import axios from 'axios';

module.exports = {
    // 热门城市
    trainhotcities(params) {
        const { resolve, reject, syncParams } = params;
        const uri = 'http://www.ly.com/huochepiao/resource/station/GetHotCityListV1';

        axios.get(uri, {
            params: {
                para: {
                    length: 15,
                    callback: '_jsonp6p6ua4ts5m5poth30m6rms4i'
                }
            }
        })
            .then((response) => {

                alert('从远程获取');

                const
                    { data = {}, headers } = response || {},
                    { TrainStation = {} } = data,
                    { StationList = [] } = TrainStation;

                const storageData = {
                    list: StationList,
                    date: headers.date
                };

                Storage.save({
                    key: 'trainhotcities',
                    data: storageData
                });
                resolve(storageData);
            })
            .catch((err) => {
                console.warn(err);
                resolve([]);
            });
    }
};
