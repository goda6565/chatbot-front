const fetchAPI = async (url: string, options: RequestInit) => {
    const apiUrl = "https://1dac-34-66-33-14.ngrok-free.app"

    if (!apiUrl) {
        return { success: false, error: "API URLが設定されていません" }
    }

    try {
        const response = await fetch(`${apiUrl}${url}`, options)

        if (!response.ok) {
            return { success: false, error: "APIでエラーが発生しました" }
        }

        // Content-Type ヘッダーが application/json の場合のみ、JSON を解析する
        const contentType = response.headers.get("Content-Type")
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            return { success: true, data }
        }

        // データなしで成功を返す
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: "ネットワークエラーが発生しました" }
    }
}

export interface ChatResponseType {
    answer: string,
    urls: string[]
}

interface ChatType {
    question: string
}

// 質問
export const requestChat = async ({
    question
}: ChatType) => {
    const body = JSON.stringify({
        question: question,
    })

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    }

    // 新規投稿を送信
    const result = await fetchAPI("/", options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, chat: null }
    }

    const chat: ChatResponseType = await result.data

    return { success: true, chat }
}