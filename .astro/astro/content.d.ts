declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"tutorial": {
"1-intro/1-brief/1-brief/content.md": {
	id: "1-intro/1-brief/1-brief/content.md";
  slug: "1-intro/1-brief/1-brief/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-intro/1-brief/2-how-it-works/content.md": {
	id: "1-intro/1-brief/2-how-it-works/content.md";
  slug: "1-intro/1-brief/2-how-it-works/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-intro/1-brief/meta.md": {
	id: "1-intro/1-brief/meta.md";
  slug: "1-intro/1-brief/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-intro/2-api/3-create-api-client/content.md": {
	id: "1-intro/2-api/3-create-api-client/content.md";
  slug: "1-intro/2-api/3-create-api-client/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-intro/2-api/4-create-admin-api-client/content.md": {
	id: "1-intro/2-api/4-create-admin-api-client/content.md";
  slug: "1-intro/2-api/4-create-admin-api-client/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-intro/2-api/meta.md": {
	id: "1-intro/2-api/meta.md";
  slug: "1-intro/2-api/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-intro/meta.md": {
	id: "1-intro/meta.md";
  slug: "1-intro/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/1-basics/1-installation/content.md": {
	id: "2-implementation/1-basics/1-installation/content.md";
  slug: "2-implementation/1-basics/1-installation/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/1-basics/2-instance/content.md": {
	id: "2-implementation/1-basics/2-instance/content.md";
  slug: "2-implementation/1-basics/2-instance/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/1-basics/3-example/content.md": {
	id: "2-implementation/1-basics/3-example/content.md";
  slug: "2-implementation/1-basics/3-example/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/1-basics/meta.md": {
	id: "2-implementation/1-basics/meta.md";
  slug: "2-implementation/1-basics/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/2-sync/1-intro/content.md": {
	id: "2-implementation/2-sync/1-intro/content.md";
  slug: "2-implementation/2-sync/1-intro/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/2-sync/2-configuration/content.md": {
	id: "2-implementation/2-sync/2-configuration/content.md";
  slug: "2-implementation/2-sync/2-configuration/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/2-sync/3-sync/content.md": {
	id: "2-implementation/2-sync/3-sync/content.md";
  slug: "2-implementation/2-sync/3-sync/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/2-sync/4-generate/content.md": {
	id: "2-implementation/2-sync/4-generate/content.md";
  slug: "2-implementation/2-sync/4-generate/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/2-sync/5-register-types/content.md": {
	id: "2-implementation/2-sync/5-register-types/content.md";
  slug: "2-implementation/2-sync/5-register-types/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/2-sync/meta.md": {
	id: "2-implementation/2-sync/meta.md";
  slug: "2-implementation/2-sync/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/3-customize/1-intro/content.md": {
	id: "2-implementation/3-customize/1-intro/content.md";
  slug: "2-implementation/3-customize/1-intro/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/3-customize/2-new-definition/content.md": {
	id: "2-implementation/3-customize/2-new-definition/content.md";
  slug: "2-implementation/3-customize/2-new-definition/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/3-customize/3-partial-overriding/content.md": {
	id: "2-implementation/3-customize/3-partial-overriding/content.md";
  slug: "2-implementation/3-customize/3-partial-overriding/content";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/3-customize/meta.md": {
	id: "2-implementation/3-customize/meta.md";
  slug: "2-implementation/3-customize/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-implementation/meta.md": {
	id: "2-implementation/meta.md";
  slug: "2-implementation/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"meta.md": {
	id: "meta.md";
  slug: "meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
