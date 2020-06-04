module.exports = {
	//提示弹窗
	showToast(text,status='none'){
		uni.showToast({
			title: text,
			icon: status
		})
	},
	//姓名 2-6个汉字
	checkName(data){
		var nameReg = /^[\u4e00-\u9fa5]{2,6}$/;
		return nameReg.test(data);
	},
	//校验手机号码--11位
	checkPhone(data){
		var phoneReg = /^[1][3-9][0-9]{9}$/;
		return phoneReg.test(data);
	},
	//校验身份证--15位或者18位
	checkIDCard(data){
		var IDCardReg = /^([1-9][0-9][0-9]{13})$|^([1-9][0-9]{16}[0-9xX])$/;
		return IDCardReg.test(data);
	},
	//隐藏手机号码中间四位 比如139xxxx0536
	hidePhone(data){
		if (Number(data) && String(data).length === 11) {
			var mobile = String(data)
			var reg = /^(\d{3})\d{4}(\d{4})$/;
			return mobile.replace(reg, '$1****$2');
		} else {
			return data;
		}
	}
	
}