import type { ReadCallback, Services, Module, MultiReadCallback } from "i18next";
import set from "lodash.set";

export interface WebpackBackendOptions {
    context: __WebpackModuleApi.RequireContext | undefined;
}

export class WebpackBackend implements Module {
    public readonly type = "backend";
    private jsons: __WebpackModuleApi.RequireContext | null = null;
    private keys: string[] = [];
    constructor(services: Services, options: WebpackBackendOptions = { context: undefined }) {
        this.init(services, options);
    }

    public init(services: Services, options: WebpackBackendOptions): void {
        if (options.context != null) {
            this.jsons = options.context;
            this.keys = this.jsons.keys();
        }
    }

    public async read(language: string, namespace: string, callback: ReadCallback): Promise<void> {
        const builtKey = `./${language}/${namespace}.json`;
        if (this.jsons == null) {
            callback(
                new Error(`No context given!`),
                // TODO: Fix this when types are up to date with newest implementation.
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                null
            );
            return;
        }
        if (this.keys.includes(builtKey) === false) {
            callback(
                new Error(`Namespace "${namespace}" for language "${language}" was not found!`),
                // TODO: Fix this when types are up to date with newest implementation.
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                null
            );
            return;
        }
        const json = await this.jsons(builtKey);
        callback(null, json);
    }

    public async readMulti(languages: string[], namespaces: string[], callback: MultiReadCallback): Promise<void> {
        const translations = {};

        await Promise.all(
            namespaces.map(async namespace => {
                return Promise.all(
                    languages.map(async lang => {
                        const builtKey = `./${lang}/${namespace}.json`;
                        if (this.jsons == null) {
                            callback(
                                new Error(`No context given!`),
                                // TODO: Fix this when types are up to date with newest implementation.
                                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                                // @ts-ignore
                                null
                            );
                            return;
                        }
                        if (this.keys.includes(builtKey) === false) {
                            console.error(new Error(`Namespace "${namespace}" for language "${lang}" was not found!`));
                            return;
                        }
                        const json = await this.jsons(builtKey);
                        set(translations, `${lang}.${namespace}`, json);
                    })
                );
            })
        );

        if (Object.keys(translations).length === 0) {
            callback(
                new Error(`Failed to load any namespace in "${namespaces}" from "${languages}"!`),
                // TODO: Fix this when types are up to date with newest implementation.
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore Error syntax
                null
            );
        } else {
            callback(null, translations);
        }
    }
}
