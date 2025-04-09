export default function ErrorPage() {
    const error: Error = new Error();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>{error.message}</p>
            <pre>{JSON.stringify(error)}</pre>
        </div>
    );
}
