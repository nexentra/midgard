import { SiteHeader } from '@/components/site-header'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class GlobalDocument extends Document {
    render() {
        return (
            <Html lang="en" suppressHydrationWarning>
                <Head />
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >

                    <div className="relative flex min-h-screen flex-col">
                        <div className="flex-1">
                            <SiteHeader />
                            <Main />
                            <NextScript />
                        </div>

                    </div>
                </body>
            </Html>
        )
    }
}

export default GlobalDocument