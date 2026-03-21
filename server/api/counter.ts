export default defineEventHandler(async (event) => {
    const storage = useStorage('data')

    if (event.method === 'POST') {
        const current = (await storage.getItem<number>('visitors')) ?? 0
        const count = current + 1
        await storage.setItem('visitors', count)
        return { count }
    }

    const count = (await storage.getItem<number>('visitors')) ?? 0
    return { count }
})
