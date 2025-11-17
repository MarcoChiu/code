//##############共用function##############


//驗證表單
const validateForm = (input) => {
    //錯誤訊息填入的地方
    const errObj = input.closest('.orderInfo-inputWrap').querySelector('.orderInfo-message');
    let isValid = true;

    // 先清除狀態
    errObj.textContent = '';
    errObj.classList.remove('error');

    // 必填欄位 且為空值時
    if (input.required && input.value.trim() === '') {
        errObj.textContent = input.tagName === "SELECT" ? `請選擇${input.name}` : `請輸入${input.name}`;
        errObj.classList.add('error');
        isValid = false;
    }

    // Email 格式驗證
    if (input.type === 'email' && input.value.trim() !== '') {//
        //AI
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(input.value)) {
            errObj.textContent = 'Email 格式不正確';
            errObj.classList.add('error');
            isValid = false;
        }
    }

    // 手機格式驗證
    if (input.type === 'tel' && input.value.trim() !== '') {// 
        //09後面八碼
        const phoneReg = /^09\d{8}$/;
        if (!phoneReg.test(input.value)) {
            errObj.textContent = '電話手機格式不正確';
            errObj.classList.add('error');
            isValid = false;
        }
    }

    return isValid;
}

//AI 平滑到物件  
const scrollTo = (element) => {
    const el = document.querySelector(element);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

//AI  Unix Timestamp 轉 日期
const fUnixTimeToDate = (UnixTime) => {
    let date = new Date(parseInt(UnixTime) * 1000);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

// 日期 轉 Unix Timestamp  //https://stackoverflow.com/questions/11893083/convert-normal-date-to-unix-timestamp
const fDateToUnixTime = (date) => {
    
    return Math.floor(new Date(date).getTime() / 1000);
};

//AI 三位一撇
const fNumThree = (num, decimalPlaces = 0) => {
    //AI
    // 1. 确保输入是字符串，并保留指定小数位数
    let fixedNum = num.toFixed(decimalPlaces);

    // 2. 分离整数和小数部分
    let parts = fixedNum.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // 3. 使用正则表达式给整数部分添加千位分隔符
    let regex = /(\d)(?=(\d{3})+(?!\d))/g;
    integerPart = integerPart.replace(regex, '$1,');

    // 4. 组合结果
    return integerPart + decimalPart;
}

//axios 錯誤處理
//https://axios-http.com/zh/docs/handling_errors
// 個人
// const axiosError = (error) => {
//     let title = '';
//     let text = '';
//     if (axios.isAxiosError(error)) {
//         if (error.code === "ERR_NETWORK") {
//             title = 'NETWORK Error';
//             text = "請檢查網路是否正常!!";
//         } else if (error.response?.status === 404) {
//             title = "Not Found";
//             text = '找不到網頁，請檢查網址是否正確!!';
//         } else if (error.response) {
//             title = error.status;
//             text = error.response.data.message;
//         } else if (error.request) {
//             title = 'Reques Error';
//             text = error.request;
//         } else {
//             title = 'Axios configuration error';
//             text = error.message;
//         }
//     } else {
//         title = 'Unexpected Error';
//         text = error.message;
//     }

//     if (title != '') {
//         Swal.fire({
//             icon: "error",
//             showCloseButton: true,//右上角X
//             title: title,
//             text: text
//         });
//     }
// }

//AI 優化
const axiosError = (error) => {
    if (!axios.isAxiosError(error)) {
        return Swal.fire({
            icon: "error",
            showCloseButton: true,
            title: 'Unexpected Error',
            text: error.message
        });
    }

    const { code, response, request, message } = error;
    let title, text;

    if (code === "ERR_NETWORK") {
        title = 'NETWORK Error';
        text = "請檢查網路是否正常!!";
    } else if (response?.status === 404) {
        title = 'Not Found';
        text = '找不到網頁，請檢查網址是否正確!!';
    } else if (response) {
        title = response.status;
        text = response.data?.message || message;
    } else if (request) {
        title = 'Request Error';
        text = request;
    } else {
        title = 'Axios configuration error';
        text = message;
    }
    Swal.fire({
        icon: "error",
        showCloseButton: true,
        title,
        text
    });
}

//參考如下，包成一個方法
//https://israynotarray.com/javascript/20220514/1988711685/
//其實在在寫得更共用，但這樣會不好呼叫
//20251027 try要包在外面層
////////////////GET//////////////
const getApi = async (array) => {
    //try {
    return response = await Promise.all(array.map(x => axios.get(x.url, x.headers)));
    //return response;
    //} catch (error) {
    //    axiosError(error);
    //}
}

///////////////POST//////////////
const postApi = async (array) => {
    //try {
    return response = await Promise.all(array.map(x => axios.post(x.url, x.obj, x.headers)));
    // return response;
    //} catch (error) {
    //     axiosError(error);
    // }
}

///////////////Patch//////////////
const patchApi = async (array) => {
    // try {
    return response = await Promise.all(array.map(x => axios.patch(x.url, x.obj, x.headers)));
    //     return response;
    // } catch (error) {
    //     axiosError(error);
    // }
}

///////////////Put//////////////
const putApi = async (array) => {
    // try {
    return response = await Promise.all(array.map(x => axios.put(x.url, x.obj, x.headers)));
    //     return response;
    // } catch (error) {
    //     axiosError(error);
    // }
}

///////////////Delete//////////////
const deleteApi = async (array) => {
    // try {
    return response = await Promise.all(array.map(x => axios.delete(x.url, x.headers)));
    //     return response;
    // } catch (error) {
    //     axiosError(error);
    // }
}

// 導出所有函數為全局變數
window.validateForm = validateForm;
window.scrollTo = scrollTo;
window.fUnixTimeToDate = fUnixTimeToDate;
window.fDateToUnixTime = fDateToUnixTime;
window.fNumThree = fNumThree;
window.axiosError = axiosError;
window.getApi = getApi;
window.postApi = postApi;
window.patchApi = patchApi;
window.putApi = putApi;
window.deleteApi = deleteApi;