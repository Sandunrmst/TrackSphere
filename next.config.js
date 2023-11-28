/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers(){
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'referrer-policy', value: 'no-referrer' //solve issue when login avatar not loading
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
