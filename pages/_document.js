import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      ctx.renderPage(sheet);
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          {/* <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Source+Serif+Pro:wght@300;400;500&display=swap"
            rel="stylesheet"
          /> */}
          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-YFJ5NPHDWE"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTAG');`,
            }}
          /> */}
          <noscript>
            {/* <link
              href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Source+Serif+Pro:wght@300;400;500&display=swap"
              rel="stylesheet"
            /> */}
          </noscript>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
