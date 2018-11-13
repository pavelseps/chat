import axios from 'axios';
import Conf from '../configurations/conf';

export default () => {
    return axios.create({
        baseURL: Conf.baseUrl,
        timeout: 1000*20,
        headers: {
            'Authorization': "Bearer " + Conf.bearer
        }
    });
}