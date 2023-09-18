

export default class APIHandler {

    constructor() {

    }


    // TODO: 전체 투두 리스트 반환. 없으면 NULL
    async getTodos() {
        const request = new APIRequest("GET", "/todos/todolist");
        const response = await APIProcessor(request as Request);
        if (response !== "Error") {
            console.log(response);
            return response.Items;
        } else {
            return null;
        }
    }
    // TODO: 투두 생성/추가 후 ID 반환
    async postTodo({ id, title, description }: { id: string, title?: string; description?: string }) {
        const request = new APIRequest("POST", "/todos/todolist", {
            id: id,
            title: title || '',
            description: description || ''
        });
        const response = await APIProcessor(request as Request);
        if (response !== "Error") {
            console.log(response);
            return response.id;
        } else {
            return null;
        }


    }

    // TODO: 투두 검색 후 확인 완료
    async putTodos({ id, completedOn }: { id: number; completedOn?: string }) {
        const request = new APIRequest("PUT", `/kanban/cards/${id}`, {
            completedOn: completedOn
        });
        await APIProcessor(request as Request);
    }




    // TODO: ID로 카드 검색 후 삭제
    async deleteTodo(id: number) {
        const request = new APIRequest("DELETE", `/kanban/cards/${id}`);
        await APIProcessor(request as Request);
    }

}

// TODO: API 요청 컨테이너. Method, Path, Body 속성
const HOST = "https://3eugx496kc.execute-api.ap-northeast-2.amazonaws.com/kanban_dev";

class APIRequest {
    method: string;
    url: string;
    body: any; // You can specify a more specific type for 'body' based on your APIRequestInterface
    constructor(method: string, path: string, body?: any) {

        this.method = method;
        this.url = HOST + path;
        this.body = body;
    }
}

// TODO: API 호출 함수
const APIProcessor = async (request: Request) => {
    try {
        const response = await fetch(request.url, {
            method: request.method, // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-api-key": "PZdv4Y8Xq5SwghvA7Asf2Z79fhOZBBM27asVz5Ba"
            },
            body: request.body ? JSON.stringify(request.body) : null // body data type must match "Content-Type" header
        });
        switch (response.status) {
            case 200:
            case 201:
                return await response.json();
            case 204:
                return null;
            default:
                console.error(await response.json());
        }
    } catch (e) {
        console.error(e);
    }
    return "Error";
};