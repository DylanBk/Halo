import bcrypt from 'bcrypt';

const checkPw = async (pw: string, hashPw: string) => {
    const res = await bcrypt.compare(pw, hashPw);

    return res;
};

export default checkPw;