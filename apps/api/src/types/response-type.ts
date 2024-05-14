// make a new interface for the response from the server
type GoodRes = {
    message: string;
    data?: any;
};

type BadRes = {
    message: string;
    code: number;
    data?: any;
};

export { GoodRes, BadRes };
