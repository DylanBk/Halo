import bcrypt from 'bcrypt';

const encrypt = async (pw: string) => {
    const rounds = 10;
    const salt = await bcrypt.genSaltSync(rounds) as string;
    const hash = await bcrypt.hashSync(pw, salt) as string;

    return hash as string;
};

export default encrypt;