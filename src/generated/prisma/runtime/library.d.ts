declare type AccelerateEngineConfig = {
    accelerateUtils?: AccelerateUtils;
    clientVersion: EngineConfig['clientVersion'];
    engineVersion: EngineConfig['engineVersion'];
    env: EngineConfig['env'];
    generator?: {
        previewFeatures: string[];
    };
    inlineDatasources: EngineConfig['inlineDatasources'];
    inlineSchema: EngineConfig['inlineSchema'];
    inlineSchemaHash: EngineConfig['inlineSchemaHash'];
    logEmitter: EngineConfig['logEmitter'];
    logLevel?: EngineConfig['logLevel'];
    logQueries?: EngineConfig['logQueries'];
    overrideDatasources: EngineConfig['overrideDatasources'];
    tracingHelper: EngineConfig['tracingHelper'];
};

declare type AccelerateUtils = EngineConfig['accelerateUtils'];

export declare type Action = 'executeRaw' | 'queryRaw' | 'runCommandRaw' | keyof typeof DMMF_2.ModelAction;

declare type ActiveConnectorType = Exclude<ConnectorType, 'postgres' | 'prisma+postgres'>;

/**
 * An interface that exposes some basic information about the
 * adapter like its name and provider type.
 */
declare interface AdapterInfo {
    readonly adapterName: (typeof officialPrismaAdapters)[number] | ({} & string);
    readonly provider: Provider;
}

export declare type Aggregate = '_avg' | '_count' | '_max' | '_min' | '_sum';

export declare type AllModelsToStringIndex<TypeMap extends TypeMapDef, Args extends Record<string, any>, K extends PropertyKey> = Args extends {
    [P in K]: {
        $allModels: infer AllModels;
    };
} ? {
    [P in K]: Record<TypeMap['meta']['modelProps'], AllModels>;
} : {};

export declare type ApplyOmit<T, OmitConfig> = Compute<{
    [K in keyof T as OmitValue<OmitConfig, K> extends true ? never : K]: T[K];
}>;

export declare type Args<T, F extends Operation> = T extends {
    [K: symbol]: {
        types: {
            operations: {
                [K in F]: {
                    args: any;
                };
            };
        };
    };
} ? T[symbol]['types']['operations'][F]['args'] : any;

export declare type Args_3<T, F extends Operation> = Args<T, F>;

/**
 * Original `quaint::ValueType` enum tag from Prisma's `quaint`.
 * Query arguments marked with this type are sanitized before being sent to the database.
 * Notice while a query argument may be `null`, `ArgType` is guaranteed to be defined.
 */
declare type ArgType = 'Array' | 'Boolean' | 'Bytes' | 'Char' | 'Date' | 'DateTime' | 'Double' | 'Enum' | 'EnumArray' | 'Float' | 'Int32' | 'Int64' | 'Json' | 'Numeric' | 'Text' | 'Time' | 'Unknown' | 'Uuid' | 'Xml';

/**
 * Attributes is a map from string to attribute values.
 *
 * Note: only the own enumerable keys are counted as valid attribute keys.
 */
declare interface Attributes {
    [attributeKey: string]: AttributeValue | undefined;
}

/**
 * Attribute values may be any non-nullish primitive value except an object.
 *
 * null or undefined attribute values are invalid and will result in undefined behavior.
 */
declare type AttributeValue = Array<boolean | null | undefined> | Array<null | number | undefined> | Array<null | string | undefined> | boolean | number | string;

export declare type BaseDMMF = {
    readonly datamodel: Omit<DMMF_2.Datamodel, 'indexes'>;
};

declare type BatchArgs = {
    queries: BatchQuery[];
    transaction?: {
        isolationLevel?: IsolationLevel_2;
    };
};

declare type BatchInternalParams = {
    customDataProxyFetch?: CustomDataProxyFetch;
    requests: RequestParams[];
};

declare type BatchQuery = {
    args: JsArgs | RawQueryArgs;
    model: string | undefined;
    operation: string;
};

declare type BatchQueryEngineResult<T> = Error | QueryEngineResultData<T>;

declare type BatchQueryOptionsCb = (args: BatchQueryOptionsCbArgs) => Promise<any>;

declare type BatchQueryOptionsCbArgs = {
    __internalParams: BatchInternalParams;
    args: BatchArgs;
    query: (args: BatchArgs, __internalParams?: BatchInternalParams) => Promise<unknown[]>;
};

declare type BatchResponse = CompactedBatchResponse | MultiBatchResponse;

declare type BatchTransactionOptions = {
    isolationLevel?: Transaction_2.IsolationLevel;
};

declare interface BinaryTargetsEnvValue {
    fromEnvVar: null | string;
    native?: boolean;
    value: string;
}

export declare type Call<F extends Fn, P> = ({
    params: P;
} & F)['returns'];

declare interface CallSite {
    getLocation(): LocationInFile | null;
}

export declare type Cast<A, W> = A extends W ? A : W;

declare type Client = ReturnType<typeof getPrismaClient> extends new () => infer T ? T : never;

export declare type ClientArg = {
    [MethodName in string]: unknown;
};

export declare type ClientArgs = {
    client: ClientArg;
};

export declare type ClientBuiltInProp = keyof DynamicClientExtensionThisBuiltin<never, never, never>;

export declare type ClientOptionDef = {
    [K in string]: any;
} | undefined;

export declare type ClientOtherOps = {
    $executeRaw(query: Sql | TemplateStringsArray, ...values: any[]): PrismaPromise<number>;
    $executeRawUnsafe(query: string, ...values: any[]): PrismaPromise<number>;
    $queryRaw<T = unknown>(query: Sql | TemplateStringsArray, ...values: any[]): PrismaPromise<T>;
    $queryRawTyped<T>(query: TypedSql<unknown[], T>): PrismaPromise<T[]>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;
    $runCommandRaw(command: InputJsonObject): PrismaPromise<JsonObject>;
};

declare type ColumnType = (typeof ColumnTypeEnum)[keyof typeof ColumnTypeEnum];

/**
 * Base class for unique values of object-valued enums.
 */
export declare abstract class ObjectEnumValue {
    constructor(arg?: symbol);
    _getName(): string;
    abstract _getNamespace(): string;
    toString(): string;
}

declare class NullTypesEnumValue extends ObjectEnumValue {
    _getNamespace(): string;
}

declare const ColumnTypeEnum: {
    readonly Boolean: 5;
    readonly BooleanArray: 69;
    readonly Bytes: 13;
    readonly BytesArray: 77;
    readonly Character: 6;
    readonly CharacterArray: 70;
    readonly Date: 8;
    readonly DateArray: 72;
    readonly DateTime: 10;
    readonly DateTimeArray: 74;
    readonly Double: 3;
    readonly DoubleArray: 67;
    readonly Enum: 12;
    readonly EnumArray: 76;
    readonly Float: 2;
    readonly FloatArray: 66;
    readonly Int32: 0;
    readonly Int32Array: 64;
    readonly Int64: 1;
    readonly Int64Array: 65;
    readonly Json: 11;
    readonly JsonArray: 75;
    readonly Numeric: 4;
    readonly NumericArray: 68;
    readonly Set: 14;
    readonly Text: 7;
    readonly TextArray: 71;
    readonly Time: 9;
    readonly TimeArray: 73;
    readonly UnknownNumber: 128;
    readonly Uuid: 15;
    readonly UuidArray: 78;
};

declare type CompactedBatchResponse = {
    arguments: Record<string, {}>[];
    expectNonEmpty: boolean;
    keys: string[];
    nestedSelection: string[];
    plan: {};
    type: 'compacted';
};

declare type CompilerWasmLoadingConfig = {
    /**
     * Loads the raw wasm module for the wasm compiler engine. This configuration is
     * generated specifically for each type of client, eg. Node.js client and Edge
     * clients will have different implementations.
     * @remarks this is a callback on purpose, we only load the wasm if needed.
     * @remarks only used by ClientEngine
     */
    getQueryCompilerWasmModule: () => Promise<unknown>;
    /**
     * WASM-bindgen runtime for corresponding module
     */
    getRuntime: () => Promise<{
        __wbg_set_wasm(exports: unknown): void;
        QueryCompiler: QueryCompilerConstructor;
    }>;
};

export declare type Compute<T> = T extends Function ? T : {
    [K in keyof T]: T[K];
} & unknown;

export declare type ComputeDeep<T> = T extends Function ? T : {
    [K in keyof T]: ComputeDeep<T[K]>;
} & unknown;

declare type ComputedField = {
    compute: ResultArgsFieldCompute;
    name: string;
    needs: string[];
};

declare type ComputedFieldsMap = {
    [fieldName: string]: ComputedField;
};

declare type ConnectionInfo = {
    maxBindValues?: number;
    schemaName?: string;
    supportsRelationJoins: boolean;
};

declare type ConnectorType = 'cockroachdb' | 'mongodb' | 'mysql' | 'postgres' | 'postgresql' | 'prisma+postgres' | 'sqlite' | 'sqlserver';

declare interface Context {
    /**
     * Return a new context which inherits from this context but does
     * not contain a value for the given key.
     *
     * @param key context key for which to clear a value
     */
    deleteValue(key: symbol): Context;
    /**
     * Get a value from the context.
     *
     * @param key key which identifies a context value
     */
    getValue(key: symbol): unknown;
    /**
     * Create a new context which inherits from this context and has
     * the given key set to the given value.
     *
     * @param key context key for which to set the value
     * @param value value to set for the given key
     */
    setValue(key: symbol, value: unknown): Context;
}

declare type Context_2<T> = T extends {
    [K: symbol]: {
        ctx: infer C;
    };
} ? {
    $name?: string;
    $parent?: unknown;
    /**
     * @deprecated Use `$name` instead.
     */
    name?: string;
} & C & T : {
    $name?: string;
    $parent?: unknown;
    /**
     * @deprecated Use `$name` instead.
     */
    name?: string;
} & T;

export declare type Count<O> = {
    [K in keyof O]: Count<number>;
} & {};

/**
 * Custom fetch function for `DataProxyEngine`.
 *
 * We can't use the actual type of `globalThis.fetch` because this will result
 * in API Extractor referencing Node.js type definitions in the `.d.ts` bundle
 * for the client runtime. We can only use such types in internal types that
 * don't end up exported anywhere.

 * It's also not possible to write a definition of `fetch` that would accept the
 * actual `fetch` function from different environments such as Node.js and
 * Cloudflare Workers (with their extensions to `RequestInit` and `Response`).
 * `fetch` is used in both covariant and contravariant positions in
 * `CustomDataProxyFetch`, making it invariant, so we need the exact same type.
 * Even if we removed the argument and left `fetch` in covariant position only,
 * then for an extension-supplied function to be assignable to `customDataProxyFetch`,
 * the platform-specific (or custom) `fetch` function needs to be assignable
 * to our `fetch` definition. This, in turn, requires the third-party `Response`
 * to be a subtype of our `Response` (which is not a problem, we could declare
 * a minimal `Response` type that only includes what we use) *and* requires the
 * third-party `RequestInit` to be a supertype of our `RequestInit` (i.e. we
 * have to declare all properties any `RequestInit` implementation in existence
 * could possibly have), which is not possible.
 *
 * Since `@prisma/extension-accelerate` redefines the type of
 * `__internalParams.customDataProxyFetch` to its own type anyway (probably for
 * exactly this reason), our definition is never actually used and is completely
 * ignored, so it doesn't matter, and we can just use `unknown` as the type of
 * `fetch` here.
 */
declare type CustomDataProxyFetch = (fetch: unknown) => unknown;

declare type DataLoaderOptions<T> = {
    batchBy: (request: T) => string | undefined;
    batchLoader: (request: T[]) => Promise<any[]>;
    batchOrder: (requestA: T, requestB: T) => number;
    singleLoader: (request: T) => Promise<any>;
};

declare type Datamodel = ReadonlyDeep_2<{
    enums: DatamodelEnum[];
    indexes: Index[];
    models: Model[];
    types: Model[];
}>;

declare type DatamodelEnum = ReadonlyDeep_2<{
    dbName?: null | string;
    documentation?: string;
    name: string;
    values: EnumValue[];
}>;

declare type Datasource = {
    url?: string;
};

declare type Datasources = {
    [name in string]: Datasource;
};

declare class AnyNull extends NullTypesEnumValue {
    #private;
}

declare class DataLoader<T = unknown> {
    batches: {
        [key: string]: Job[];
    };
    get [Symbol.toStringTag](): string;
    private dispatchBatches;
    private options;
    private tickActive;
    constructor(options: DataLoaderOptions<T>);
    request(request: T): Promise<any>;
}

declare class DbNull extends NullTypesEnumValue {
    #private;
}

/**
 * @param this
 */
declare function $extends(this: Client, extension: ((client: Client) => Client) | ExtensionArgs): Client;

export declare const Debug: {
    disable(): any;
    enable(namespace: any): void;
    enabled(namespace: string): boolean;
    formatters: {};
    log: (...args: string[]) => void;
} & typeof debugCreate;

export declare function createParam(name: string): Param<unknown, string>;

declare function datamodelEnumToSchemaEnum(datamodelEnum: DatamodelEnum): SchemaEnum;

export declare namespace Decimal {
    // http://mikemcl.github.io/decimal.js/#constructor-properties
    export interface Config {
        crypto?: boolean;
        defaults?: boolean;
        maxE?: number;
        minE?: number;
        modulo?: Modulo;
        precision?: number;
        rounding?: Rounding;
        toExpNeg?: number;
        toExpPos?: number;
    }
    export type Constructor = typeof Decimal;
    export type Instance = Decimal;
    export type Modulo = 9 | Rounding;
    export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    export type Value = Decimal | number | string;
}

/**
 * Interface for any Decimal.js-like library
 * Allows us to accept Decimal.js from different
 * versions and some compatible alternatives
 */
export declare interface DecimalJsLike {
    d: number[];
    e: number;
    s: number;
    toFixed(): string;
}

export declare type DefaultArgs = InternalArgs<{}, {}, {}, {}>;

export declare type DefaultSelection<Payload extends OperationPayload, Args = {}, GlobalOmitOptions = {}> = Args extends {
    omit: infer LocalOmit;
} ? ApplyOmit<UnwrapPayload<{
    default: Payload;
}>['default'], PatchFlat<LocalOmit, ExtractGlobalOmit<GlobalOmitOptions, Uncapitalize<Payload['name']>>>> : ApplyOmit<UnwrapPayload<{
    default: Payload;
}>['default'], ExtractGlobalOmit<GlobalOmitOptions, Uncapitalize<Payload['name']>>>;

export declare class Decimal {
    static readonly crypto: boolean;
    static readonly Decimal?: Decimal.Constructor;
    static readonly default?: Decimal.Constructor;

    static readonly EUCLID: 9;

    static readonly maxE: number;
    static readonly minE: number;

    static readonly modulo: Decimal.Modulo;

    static readonly precision: number;
    static readonly ROUND_CEIL: 2;

    static readonly ROUND_DOWN: 1;
    static readonly ROUND_FLOOR: 3;

    static readonly ROUND_HALF_CEIL: 7;
    static readonly ROUND_HALF_DOWN: 5;

    static readonly ROUND_HALF_EVEN: 6;
    static readonly ROUND_HALF_FLOOR: 8;

    static readonly ROUND_HALF_UP: 4;
    static readonly ROUND_UP: 0;

    static readonly rounding: Decimal.Rounding;
    static readonly toExpNeg: number;

    static readonly toExpPos: number;
    readonly d: number[];

    readonly e: number;
    readonly s: number;

    constructor(n: Decimal.Value);

    static abs(n: Decimal.Value): Decimal;
    static acos(n: Decimal.Value): Decimal;

    static acosh(n: Decimal.Value): Decimal;
    static add(x: Decimal.Value, y: Decimal.Value): Decimal;

    static asin(n: Decimal.Value): Decimal;
    static asinh(n: Decimal.Value): Decimal;

    static atan(n: Decimal.Value): Decimal;
    static atan2(y: Decimal.Value, x: Decimal.Value): Decimal;

    static atanh(n: Decimal.Value): Decimal;
    static cbrt(n: Decimal.Value): Decimal;

    static ceil(n: Decimal.Value): Decimal;
    static clamp(n: Decimal.Value, min: Decimal.Value, max: Decimal.Value): Decimal;

    static clone(object?: Decimal.Config): Decimal.Constructor;
    static config(object: Decimal.Config): Decimal.Constructor;

    static cos(n: Decimal.Value): Decimal;
    static cosh(n: Decimal.Value): Decimal;

    static div(x: Decimal.Value, y: Decimal.Value): Decimal;
    static exp(n: Decimal.Value): Decimal;

    static floor(n: Decimal.Value): Decimal;
    static hypot(...n: Decimal.Value[]): Decimal;

    static isDecimal(object: any): object is Decimal;
    static ln(n: Decimal.Value): Decimal;

    static log(n: Decimal.Value, base?: Decimal.Value): Decimal;

    static log10(n: Decimal.Value): Decimal;
    static log2(n: Decimal.Value): Decimal;

    static max(...n: Decimal.Value[]): Decimal;

    static min(...n: Decimal.Value[]): Decimal;
    static mod(x: Decimal.Value, y: Decimal.Value): Decimal;

    static mul(x: Decimal.Value, y: Decimal.Value): Decimal;
    static noConflict(): Decimal.Constructor;   // Browser only

    static pow(base: Decimal.Value, exponent: Decimal.Value): Decimal;

    static random(significantDigits?: number): Decimal;
    static round(n: Decimal.Value): Decimal;

    static set(object: Decimal.Config): Decimal.Constructor;
    static sign(n: Decimal.Value): number;

    static sin(n: Decimal.Value): Decimal;
    static sinh(n: Decimal.Value): Decimal;

    static sqrt(n: Decimal.Value): Decimal;
    static sub(x: Decimal.Value, y: Decimal.Value): Decimal;

    static sum(...n: Decimal.Value[]): Decimal;
    static tan(n: Decimal.Value): Decimal;

    static tanh(n: Decimal.Value): Decimal;
    static trunc(n: Decimal.Value): Decimal;

    abs(): Decimal;
    absoluteValue(): Decimal;

    acos(): Decimal;
    acosh(): Decimal;

    add(n: Decimal.Value): Decimal;
    asin(): Decimal;

    asinh(): Decimal;
    atan(): Decimal;

    atanh(): Decimal;

    cbrt(): Decimal;
    ceil(): Decimal;

    clamp(min: Decimal.Value, max: Decimal.Value): Decimal;
    clampedTo(min: Decimal.Value, max: Decimal.Value): Decimal;

    cmp(n: Decimal.Value): number;
    comparedTo(n: Decimal.Value): number;

    cos(): Decimal;
    cosh(): Decimal;

    cosine(): Decimal;
    cubeRoot(): Decimal;

    decimalPlaces(): number;
    div(n: Decimal.Value): Decimal;
    dividedBy(n: Decimal.Value): Decimal;
    dividedToIntegerBy(n: Decimal.Value): Decimal;

    divToInt(n: Decimal.Value): Decimal;
    dp(): number;

    eq(n: Decimal.Value): boolean;
    equals(n: Decimal.Value): boolean;

    exp(): Decimal;

    floor(): Decimal;
    greaterThan(n: Decimal.Value): boolean;
    greaterThanOrEqualTo(n: Decimal.Value): boolean;
    gt(n: Decimal.Value): boolean;

    gte(n: Decimal.Value): boolean;

    hyperbolicCosine(): Decimal;

    hyperbolicSine(): Decimal;

    hyperbolicTangent(): Decimal;
    inverseCosine(): Decimal;

    inverseHyperbolicCosine(): Decimal;
    inverseHyperbolicSine(): Decimal;

    inverseHyperbolicTangent(): Decimal;
    inverseSine(): Decimal;

    inverseTangent(): Decimal;
    isFinite(): boolean;
    isInt(): boolean;
    isInteger(): boolean;

    isNaN(): boolean;

    isNeg(): boolean;
    isNegative(): boolean;

    isPos(): boolean;

    isPositive(): boolean;
    isZero(): boolean;
    lessThan(n: Decimal.Value): boolean;
    lessThanOrEqualTo(n: Decimal.Value): boolean;
    ln(): Decimal;
    log(n?: Decimal.Value): Decimal;
    logarithm(n?: Decimal.Value): Decimal;
    lt(n: Decimal.Value): boolean;
    lte(n: Decimal.Value): boolean;
    minus(n: Decimal.Value): Decimal;
    mod(n: Decimal.Value): Decimal;
    modulo(n: Decimal.Value): Decimal;
    mul(n: Decimal.Value) : Decimal;
    naturalExponential(): Decimal;
    naturalLogarithm(): Decimal;
    neg(): Decimal;
    negated(): Decimal;
    plus(n: Decimal.Value): Decimal;
    pow(n: Decimal.Value): Decimal;
    precision(includeZeros?: boolean): number;
    round(): Decimal;
    sd(includeZeros?: boolean): number;
    sin() : Decimal;
    sine() : Decimal;
    sinh(): Decimal;
    sqrt(): Decimal;
    squareRoot(): Decimal;
    sub(n: Decimal.Value): Decimal;
    tan() : Decimal;
    tangent() : Decimal;
    tanh(): Decimal;
    times(n: Decimal.Value): Decimal;
    toBinary(significantDigits?: number): string;
    toBinary(significantDigits: number, rounding: Decimal.Rounding): string;
    toDecimalPlaces(decimalPlaces?: number): Decimal;
    toDecimalPlaces(decimalPlaces: number, rounding: Decimal.Rounding): Decimal;
    toDP(decimalPlaces?: number): Decimal;
    toDP(decimalPlaces: number, rounding: Decimal.Rounding): Decimal;
    toExponential(decimalPlaces?: number): string;
    toExponential(decimalPlaces: number, rounding: Decimal.Rounding): string;
    toFixed(decimalPlaces?: number): string;
    toFixed(decimalPlaces: number, rounding: Decimal.Rounding): string;
    toFraction(max_denominator?: Decimal.Value): Decimal[];

    toHex(significantDigits?: number): string;
    toHex(significantDigits: number, rounding?: Decimal.Rounding): string;

    toHexadecimal(significantDigits?: number): string;
    toHexadecimal(significantDigits: number, rounding: Decimal.Rounding): string;
    toJSON(): string;
    toNearest(n: Decimal.Value, rounding?: Decimal.Rounding): Decimal;
    toNumber(): number;
    toOctal(significantDigits?: number): string;
    toOctal(significantDigits: number, rounding: Decimal.Rounding): string;
    toPower(n: Decimal.Value): Decimal;

    toPrecision(significantDigits?: number): string;
    toPrecision(significantDigits: number, rounding: Decimal.Rounding): string;
    toSD(significantDigits?: number): Decimal;
    toSD(significantDigits: number, rounding: Decimal.Rounding): Decimal;
    toSignificantDigits(significantDigits?: number): Decimal;
    toSignificantDigits(significantDigits: number, rounding: Decimal.Rounding): Decimal;
    toString(): string;
    trunc(): Decimal;
    truncated(): Decimal;
    valueOf(): string;
}

/**
 * Create a new debug instance with the given namespace.
 *
 * @example
 * ```ts
 * import Debug from '@prisma/debug'
 * const debug = Debug('prisma:client')
 * debug('Hello World')
 * ```
 */
declare function debugCreate(namespace: string): ((...args: any[]) => void) & {
    color: string;
    enabled: boolean;
    extend: () => void;
    log: (...args: string[]) => void;
    namespace: string;
};

export declare function Decimal(n: Decimal.Value): Decimal;

declare const denylist: readonly ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];

declare type Deprecation = ReadonlyDeep_2<{
    plannedRemovalVersion?: string;
    reason: string;
    sinceVersion: string;
}>;

declare type DeserializedResponse = Array<Record<string, unknown>>;

export declare type DevTypeMapDef = {
    meta: {
        modelProps: string;
    };
    model: {
        [Model in PropertyKey]: {
            [Operation in PropertyKey]: DevTypeMapFnDef;
        };
    };
    other: {
        [Operation in PropertyKey]: DevTypeMapFnDef;
    };
};

export declare type DevTypeMapFnDef = {
    args: any;
    payload: OperationPayload;
    result: any;
};

export declare function defineDmmfProperty(target: object, runtimeDataModel: RuntimeDataModel): void;

declare function defineExtension(ext: ((client: Client) => Client) | ExtensionArgs): (client: Client) => Client;

export declare namespace DMMF {
    export {
        Datamodel,
        DatamodelEnum,
        datamodelEnumToSchemaEnum,
        Deprecation,
        Document_2 as Document,
        EnumValue,
        Field,
        FieldDefault,
        FieldDefaultScalar,
        FieldKind,
        FieldLocation,
        FieldNamespace,
        FieldRefAllowType,
        FieldRefType,
        Index,
        IndexField,
        IndexType,
        InputType,
        InputTypeRef,
        Mappings,
        Model,
        ModelAction,
        ModelMapping,
        OtherOperationMappings,
        OutputType,
        OutputTypeRef,
        PrimaryKey,
        Query,
        QueryOutput,
        Schema,
        SchemaArg,
        SchemaEnum,
        SchemaField,
        SortOrder,
        TypeRef,
        uniqueIndex
    }
}

declare namespace DMMF_2 {
    export {
        Datamodel,
        DatamodelEnum,
        datamodelEnumToSchemaEnum,
        Deprecation,
        Document_2 as Document,
        EnumValue,
        Field,
        FieldDefault,
        FieldDefaultScalar,
        FieldKind,
        FieldLocation,
        FieldNamespace,
        FieldRefAllowType,
        FieldRefType,
        Index,
        IndexField,
        IndexType,
        InputType,
        InputTypeRef,
        Mappings,
        Model,
        ModelAction,
        ModelMapping,
        OtherOperationMappings,
        OutputType,
        OutputTypeRef,
        PrimaryKey,
        Query,
        QueryOutput,
        Schema,
        SchemaArg,
        SchemaEnum,
        SchemaField,
        SortOrder,
        TypeRef,
        uniqueIndex
    }
}

declare type Document_2 = ReadonlyDeep_2<{
    datamodel: Datamodel;
    mappings: Mappings;
    schema: Schema;
}>;

/**
 * A generic driver adapter factory that allows the user to instantiate a
 * driver adapter. The query and result types are specific to the adapter.
 */
declare interface DriverAdapterFactory<Query, Result> extends AdapterInfo {
    /**
     * Instantiate a driver adapter.
     */
    connect(): Promise<Queryable<Query, Result>>;
}

/** Client */
export declare type DynamicClientExtensionArgs<C_, TypeMap extends TypeMapDef, TypeMapCb extends TypeMapCbDef, ExtArgs extends Record<string, any>> = {
    [K: symbol]: {
        ctx: {
            $parent: Optional<DynamicClientExtensionThis<TypeMap, TypeMapCb, ExtArgs>, ITXClientDenyList>;
        } & Optional<DynamicClientExtensionThis<TypeMap, TypeMapCb, ExtArgs>, ITXClientDenyList>;
    };
} & {
    [P in keyof C_]: unknown;
};

export declare type DynamicClientExtensionThis<TypeMap extends TypeMapDef, TypeMapCb extends TypeMapCbDef, ExtArgs extends Record<string, any>> = {
    [K: symbol]: {
        types: TypeMap['other'];
    };
} & {
    [P in Exclude<ClientBuiltInProp, keyof ExtArgs['client']>]: DynamicClientExtensionThisBuiltin<TypeMap, TypeMapCb, ExtArgs>[P];
} & {
    [P in Exclude<keyof TypeMap['other']['operations'], keyof ExtArgs['client']>]: P extends keyof ClientOtherOps ? ClientOtherOps[P] : never;
} & {
    [P in Exclude<TypeMap['meta']['modelProps'], keyof ExtArgs['client']>]: DynamicModelExtensionThis<TypeMap, ModelKey<TypeMap, P>, ExtArgs>;
} & {
    [P in keyof ExtArgs['client']]: Return<ExtArgs['client'][P]>;
};

export declare type DynamicClientExtensionThisBuiltin<TypeMap extends TypeMapDef, TypeMapCb extends TypeMapCbDef, ExtArgs extends Record<string, any>> = {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    $extends: ExtendsHook<'extends', TypeMapCb, ExtArgs, Call<TypeMapCb, {
        extArgs: ExtArgs;
    }>>;
    $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: TypeMap['meta']['txIsolationLevel'];
    }): Promise<UnwrapTuple<P>>;
    $transaction<R>(fn: (client: Omit<DynamicClientExtensionThis<TypeMap, TypeMapCb, ExtArgs>, ITXClientDenyList>) => Promise<R>, options?: {
        isolationLevel?: TypeMap['meta']['txIsolationLevel'];
        maxWait?: number;
        timeout?: number;
    }): Promise<R>;
};

/** Model */
export declare type DynamicModelExtensionArgs<M_, TypeMap extends TypeMapDef, TypeMapCb extends TypeMapCbDef, ExtArgs extends Record<string, any>> = {
    [K in keyof M_]: K extends '$allModels' ? {
        [K: symbol]: {};
    } & {
        [P in keyof M_[K]]?: unknown;
    } : K extends TypeMap['meta']['modelProps'] ? {
        [K: symbol]: {
            ctx: {
                /**
                 * @deprecated Use `$name` instead.
                 */
                name: ModelKey<TypeMap, K>;
            } & {
                $name: ModelKey<TypeMap, K>;
            } & {
                $parent: DynamicClientExtensionThis<TypeMap, TypeMapCb, ExtArgs>;
            } & DynamicModelExtensionThis<TypeMap, ModelKey<TypeMap, K>, ExtArgs>;
        };
    } & {
        [P in keyof M_[K]]?: unknown;
    } : never;
};

export declare type DynamicModelExtensionFluentApi<TypeMap extends TypeMapDef, M extends PropertyKey, P extends PropertyKey, Null> = {
    [K in keyof TypeMap['model'][M]['payload']['objects']]: <A>(args?: Exact<A, Path<TypeMap['model'][M]['operations'][P]['args']['select'], [K]>>) => DynamicModelExtensionFluentApi<TypeMap, ({} & TypeMap['model'][M]['payload']['objects'][K])['name'], P, Null | Select<TypeMap['model'][M]['payload']['objects'][K], null>> & PrismaPromise<Null | Path<DynamicModelExtensionFnResultBase<TypeMap, M, {
        select: {
            [P in K]: A;
        };
    }, P>, [K]>>;
};

export declare type DynamicModelExtensionFnResult<TypeMap extends TypeMapDef, M extends PropertyKey, A, P extends PropertyKey, Null> = P extends FluentOperation ? DynamicModelExtensionFluentApi<TypeMap, M, P, Null> & PrismaPromise<DynamicModelExtensionFnResultBase<TypeMap, M, A, P> | Null> : PrismaPromise<DynamicModelExtensionFnResultBase<TypeMap, M, A, P>>;

export declare type DynamicModelExtensionFnResultBase<TypeMap extends TypeMapDef, M extends PropertyKey, A, P extends PropertyKey> = GetResult<TypeMap['model'][M]['payload'], A, Operation & P, TypeMap['globalOmitOptions']>;

export declare type DynamicModelExtensionFnResultNull<P extends PropertyKey> = P extends 'findFirst' | 'findUnique' ? null : never;

export declare type DynamicModelExtensionOperationFn<TypeMap extends TypeMapDef, M extends PropertyKey, P extends PropertyKey> = {} extends TypeMap['model'][M]['operations'][P]['args'] ? <A extends TypeMap['model'][M]['operations'][P]['args']>(args?: Exact<A, TypeMap['model'][M]['operations'][P]['args']>) => DynamicModelExtensionFnResult<TypeMap, M, A, P, DynamicModelExtensionFnResultNull<P>> : <A extends TypeMap['model'][M]['operations'][P]['args']>(args: Exact<A, TypeMap['model'][M]['operations'][P]['args']>) => DynamicModelExtensionFnResult<TypeMap, M, A, P, DynamicModelExtensionFnResultNull<P>>;

export declare type DynamicModelExtensionThis<TypeMap extends TypeMapDef, M extends PropertyKey, ExtArgs extends Record<string, any>> = {
    [K: symbol]: {
        types: TypeMap['model'][M];
    };
} & {
    [P in Exclude<'fields', keyof ExtArgs['model'][Uncapitalize<M & string>]>]: TypeMap['model'][M]['fields'];
} & {
    [P in Exclude<keyof TypeMap['model'][M]['operations'], keyof ExtArgs['model'][Uncapitalize<M & string>]>]: DynamicModelExtensionOperationFn<TypeMap, M, P>;
} & {
    [P in keyof ExtArgs['model'][Uncapitalize<M & string>]]: Return<ExtArgs['model'][Uncapitalize<M & string>][P]>;
};

/** Query */
export declare type DynamicQueryExtensionArgs<Q_, TypeMap extends TypeMapDef> = {
    [K in keyof Q_]: K extends '$allOperations' ? (args: {
        args: any;
        model?: string;
        operation: string;
        query: (args: any) => PrismaPromise<any>;
    }) => Promise<any> : K extends '$allModels' ? {
        [P in '$allOperations' | keyof Q_[K] | keyof TypeMap['model'][keyof TypeMap['model']]['operations']]?: P extends '$allOperations' ? DynamicQueryExtensionCb<TypeMap, 'model', keyof TypeMap['model'], keyof TypeMap['model'][keyof TypeMap['model']]['operations']> : P extends keyof TypeMap['model'][keyof TypeMap['model']]['operations'] ? DynamicQueryExtensionCb<TypeMap, 'model', keyof TypeMap['model'], P> : never;
    } : K extends TypeMap['meta']['modelProps'] ? {
        [P in '$allOperations' | keyof Q_[K] | keyof TypeMap['model'][ModelKey<TypeMap, K>]['operations']]?: P extends '$allOperations' ? DynamicQueryExtensionCb<TypeMap, 'model', ModelKey<TypeMap, K>, keyof TypeMap['model'][ModelKey<TypeMap, K>]['operations']> : P extends keyof TypeMap['model'][ModelKey<TypeMap, K>]['operations'] ? DynamicQueryExtensionCb<TypeMap, 'model', ModelKey<TypeMap, K>, P> : never;
    } : K extends keyof TypeMap['other']['operations'] ? DynamicQueryExtensionCb<[TypeMap], 0, 'other', K> : never;
};

export declare type DynamicQueryExtensionCb<TypeMap extends TypeMapDef, _0 extends PropertyKey, _1 extends PropertyKey, _2 extends PropertyKey> = <A extends DynamicQueryExtensionCbArgs<TypeMap, _0, _1, _2>>(args: A) => Promise<TypeMap[_0][_1][_2]['result']>;

export declare type DynamicQueryExtensionCbArgs<TypeMap extends TypeMapDef, _0 extends PropertyKey, _1 extends PropertyKey, _2 extends PropertyKey> = (_1 extends unknown ? _2 extends unknown ? {
    args: DynamicQueryExtensionCbArgsArgs<TypeMap, _0, _1, _2>;
    model: _0 extends 0 ? undefined : _1;
    operation: _2;
    query: <A extends DynamicQueryExtensionCbArgsArgs<TypeMap, _0, _1, _2>>(args: A) => PrismaPromise<TypeMap[_0][_1]['operations'][_2]['result']>;
} : never : never) & {
    query: (args: DynamicQueryExtensionCbArgsArgs<TypeMap, _0, _1, _2>) => PrismaPromise<TypeMap[_0][_1]['operations'][_2]['result']>;
};

export declare type DynamicQueryExtensionCbArgsArgs<TypeMap extends TypeMapDef, _0 extends PropertyKey, _1 extends PropertyKey, _2 extends PropertyKey> = _2 extends '$executeRaw' | '$queryRaw' ? Sql : TypeMap[_0][_1]['operations'][_2]['args'];

/** Result */
export declare type DynamicResultExtensionArgs<R_, TypeMap extends TypeMapDef> = {
    [K in keyof R_]: {
        [P in keyof R_[K]]?: {
            compute(data: DynamicResultExtensionData<TypeMap, ModelKey<TypeMap, K>, R_[K][P]>): any;
            needs?: DynamicResultExtensionNeeds<TypeMap, ModelKey<TypeMap, K>, R_[K][P]>;
        };
    };
};

export declare type DynamicResultExtensionData<TypeMap extends TypeMapDef, M extends PropertyKey, S> = GetFindResult<TypeMap['model'][M]['payload'], {
    select: S;
}, {}>;

export declare function deserializeJsonResponse(result: unknown): unknown;

export declare function deserializeRawResult(response: RawResponse): DeserializedResponse;

/**
 * Placeholder value for "no text".
 */
export declare const empty: Sql;

export declare type DynamicResultExtensionNeeds<TypeMap extends TypeMapDef, M extends PropertyKey, S> = {
    [K in keyof S]: K extends keyof TypeMap['model'][M]['payload']['scalars'] ? S[K] : never;
} & {
    [N in keyof TypeMap['model'][M]['payload']['scalars']]?: boolean;
};

export declare type EmptyToUnknown<T> = T;

declare interface Engine<InteractiveTransactionPayload = unknown> {
    applyPendingMigrations(): Promise<void>;
    metrics(options: MetricsOptionsJson): Promise<Metrics>;
    metrics(options: MetricsOptionsPrometheus): Promise<string>;
    /** The name of the engine. This is meant to be consumed externally */
    readonly name: string;
    onBeforeExit(callback: () => Promise<void>): void;
    request<T>(query: JsonQuery, options: RequestOptions<InteractiveTransactionPayload>): Promise<QueryEngineResultData<T>>;
    requestBatch<T>(queries: JsonQuery[], options: RequestBatchOptions<InteractiveTransactionPayload>): Promise<BatchQueryEngineResult<T>[]>;
    start(): Promise<void>;
    stop(): Promise<void>;
    transaction(action: 'start', headers: Transaction_2.TransactionHeaders, options: Transaction_2.Options): Promise<Transaction_2.InteractiveTransactionInfo<unknown>>;
    transaction(action: 'commit', headers: Transaction_2.TransactionHeaders, info: Transaction_2.InteractiveTransactionInfo<unknown>): Promise<void>;
    transaction(action: 'rollback', headers: Transaction_2.TransactionHeaders, info: Transaction_2.InteractiveTransactionInfo<unknown>): Promise<void>;
    version(forceRun?: boolean): Promise<string> | string;
}

declare interface EngineConfig {
    /**
     * Allows Accelerate to use runtime utilities from the client. These are
     * necessary for the AccelerateEngine to function correctly.
     */
    accelerateUtils?: {
        clientVersion: string;
        debug: (...args: any[]) => void;
        engineVersion: string;
        getBatchRequestPayload: typeof getBatchRequestPayload;
        PrismaClientInitializationError: typeof PrismaClientInitializationError;
        PrismaClientKnownRequestError: typeof PrismaClientKnownRequestError;
        PrismaClientUnknownRequestError: typeof PrismaClientUnknownRequestError;
        prismaGraphQLToJSError: typeof prismaGraphQLToJSError;
        resolveDatasourceUrl: typeof resolveDatasourceUrl;
    };
    activeProvider?: string;
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`.
     * If set, this is only used in the library engine, and all queries would be performed through it,
     * rather than Prisma's Rust drivers.
     * @remarks only used by LibraryEngine.ts
     */
    adapter?: SqlDriverAdapterFactory;
    allowTriggerPanic?: boolean;
    clientVersion: string;
    compilerWasm?: CompilerWasmLoadingConfig;
    cwd: string;
    dirname: string;
    enableDebugLogs?: boolean;
    engineEndpoint?: string;
    engineVersion: string;
    /**
     * Web Assembly module loading configuration
     */
    engineWasm?: EngineWasmLoadingConfig;
    env: Record<string, string>;
    flags?: string[];
    generator?: GeneratorConfig;
    /**
     * The contents of the datasource url saved in a string
     * @remarks only used by DataProxyEngine.ts
     * @remarks this field is used internally by Policy, do not rename or remove
     */
    inlineDatasources: GetPrismaClientConfig['inlineDatasources'];
    /**
     * The contents of the schema encoded into a string
     */
    inlineSchema: string;
    /**
     * The string hash that was produced for a given schema
     * @remarks only used by DataProxyEngine.ts
     */
    inlineSchemaHash: string;
    /**
     * Information about whether we have not found a schema.prisma file in the
     * default location, and that we fell back to finding the schema.prisma file
     * in the current working directory. This usually means it has been bundled.
     */
    isBundled?: boolean;
    logEmitter: LogEmitter;
    logLevel?: 'info' | 'warn';
    logQueries?: boolean;
    /**
     * @remarks this field is used internally by Policy, do not rename or remove
     */
    overrideDatasources: Datasources;
    previewFeatures?: string[];
    prismaPath?: string;
    showColors?: boolean;
    /**
     * The helper for interaction with OTEL tracing
     * @remarks enabling is determined by the client and @prisma/instrumentation package
     */
    tracingHelper: TracingHelper;
    transactionOptions: Transaction_2.Options;
}

declare type EngineEvent<E extends EngineEventType> = E extends QueryEventType ? QueryEvent : LogEvent;

declare type EngineEventType = LogEventType | QueryEventType;

declare type EngineSpan = {
    attributes?: Record<string, unknown>;
    endTime: HrTime;
    id: EngineSpanId;
    kind: EngineSpanKind;
    links?: EngineSpanId[];
    name: string;
    parentId: null | string;
    startTime: HrTime;
};

declare type EngineSpanId = string;

declare type EngineSpanKind = 'client' | 'internal';

declare type EngineWasmLoadingConfig = {
    /**
     * Loads the raw wasm module for the wasm query engine. This configuration is
     * generated specifically for each type of client, eg. Node.js client and Edge
     * clients will have different implementations.
     * @remarks this is a callback on purpose, we only load the wasm if needed.
     * @remarks only used by LibraryEngine
     */
    getQueryEngineWasmModule: () => Promise<unknown>;
    /**
     * WASM-bindgen runtime for corresponding module
     */
    getRuntime: () => Promise<{
        __wbg_set_wasm(exports: unknown): void;
        QueryEngine: QueryEngineConstructor;
    }>;
};

declare type EnumValue = ReadonlyDeep_2<{
    dbName: null | string;
    name: string;
}>;

declare type EnvPaths = {
    rootEnvPath: null | string;
    schemaEnvPath: string | undefined;
};

declare interface EnvValue {
    fromEnvVar: null | string;
    value: null | string;
}

export declare type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? 1 : 0;

declare type Error_2 = {
    /**
     * Sqlite extended error code: https://www.sqlite.org/rescode.html
     */
    extendedCode: number;
    kind: 'sqlite';
    message: string;
} | {
    cause: string;
    kind: 'InconsistentColumnData';
} | {
    cause: string;
    kind: 'TooManyConnections';
} | {
    cause: string;
    kind: 'TransactionAlreadyClosed';
} | {
    cause: string;
    kind: 'ValueOutOfRange';
} | {
    code: number;
    kind: 'mssql';
    message: string;
} | {
    code: number;
    kind: 'mysql';
    message: string;
    state: string;
} | {
    code: string;
    column: string | undefined;
    detail: string | undefined;
    hint: string | undefined;
    kind: 'postgres';
    message: string;
    severity: string;
} | {
    column?: string;
    kind: 'ColumnNotFound';
} | {
    column?: string;
    kind: 'LengthMismatch';
} | {
    constraint?: {
        fields: string[];
    } | {
        foreignKey: {};
    } | {
        index: string;
    };
    kind: 'ForeignKeyConstraintViolation';
} | {
    constraint?: {
        fields: string[];
    } | {
        foreignKey: {};
    } | {
        index: string;
    };
    kind: 'NullConstraintViolation';
} | {
    constraint?: {
        fields: string[];
    } | {
        foreignKey: {};
    } | {
        index: string;
    };
    kind: 'UniqueConstraintViolation';
} | {
    db?: string;
    kind: 'DatabaseAccessDenied';
} | {
    db?: string;
    kind: 'DatabaseAlreadyExists';
} | {
    db?: string;
    kind: 'DatabaseDoesNotExist';
} | {
    id: number;
    kind: 'GenericJs';
} | {
    kind: 'AuthenticationFailed';
    user?: string;
} | {
    kind: 'InvalidIsolationLevel';
    level: string;
} | {
    kind: 'MissingFullTextSearchIndex';
} | {
    kind: 'SocketTimeout';
} | {
    kind: 'TableDoesNotExist';
    table?: string;
} | {
    kind: 'TransactionWriteConflict';
} | {
    kind: 'UnsupportedNativeDataType';
    type: string;
};

declare type ErrorCapturingFunction<T> = T extends (...args: infer A) => Promise<infer R> ? (...args: A) => Promise<Result_4<ErrorCapturingInterface<R>>> : T extends (...args: infer A) => infer R ? (...args: A) => Result_4<ErrorCapturingInterface<R>> : T;

declare type ErrorCapturingInterface<T> = {
    [K in keyof T]: ErrorCapturingFunction<T[K]>;
};

declare interface ErrorCapturingSqlDriverAdapter extends ErrorCapturingInterface<SqlDriverAdapter> {
    readonly errorRegistry: ErrorRegistry;
}

declare type ErrorFormat = 'colorless' | 'minimal' | 'pretty';

declare type ErrorRecord = {
    error: unknown;
};

declare interface ErrorRegistry {
    consumeError(id: number): ErrorRecord | undefined;
}

declare interface ErrorWithBatchIndex {
    batchRequestIdx?: number;
}

declare type EventCallback<E extends ExtendedEventType> = [E] extends ['beforeExit'] ? () => Promise<void> : [E] extends [LogLevel] ? (event: EngineEvent<E>) => void : never;

export declare type Exact<A, W> = (A extends Narrowable ? A : never) | (A extends unknown ? (W extends A ? {
    [K in keyof A]: Exact<A[K], W[K]>;
} : W) : never);

/**
 * Defines Exception.
 *
 * string or an object with one of (message or name or code) and optional stack
 */
declare type Exception = ExceptionWithCode | ExceptionWithMessage | ExceptionWithName | string;

declare interface ExceptionWithCode {
    code: number | string;
    message?: string;
    name?: string;
    stack?: string;
}

declare interface ExceptionWithMessage {
    code?: number | string;
    message: string;
    name?: string;
    stack?: string;
}

declare interface ExceptionWithName {
    code?: number | string;
    message?: string;
    name: string;
    stack?: string;
}

declare type ExtendedEventType = 'beforeExit' | LogLevel;

declare type ExtendedSpanOptions = {
    /** Whether it propagates context (?=true) */
    active?: boolean;
    /** The context to append the span to */
    context?: Context;
    internal?: boolean;
    middleware?: boolean;
    /** The name of the span */
    name: string;
} & SpanOptions;

export declare function dmmfToRuntimeDataModel(dmmfDataModel: DMMF_2.Datamodel): RuntimeDataModel;

declare namespace Extensions {
    export {
        defineExtension,
        getExtensionContext
    }
}
export { Extensions }

declare namespace Extensions_2 {
    export {
        AllModelsToStringIndex,
        ClientBuiltInProp,
        ClientOptionDef,
        ClientOtherOps,
        DefaultArgs,
        DevTypeMapDef,
        DevTypeMapFnDef,
        DynamicClientExtensionArgs,
        DynamicClientExtensionThis,
        DynamicClientExtensionThisBuiltin,
        DynamicModelExtensionArgs,
        DynamicModelExtensionFluentApi,
        DynamicModelExtensionFnResult,
        DynamicModelExtensionFnResultBase,
        DynamicModelExtensionFnResultNull,
        DynamicModelExtensionOperationFn,
        DynamicModelExtensionThis,
        DynamicQueryExtensionArgs,
        DynamicQueryExtensionCb,
        DynamicQueryExtensionCbArgs,
        DynamicQueryExtensionCbArgsArgs,
        DynamicResultExtensionArgs,
        DynamicResultExtensionData,
        DynamicResultExtensionNeeds,
        ExtendsHook,
        GetOmit,
        GetPayloadResult,
        GetPayloadResultExtensionKeys,
        GetPayloadResultExtensionObject,
        GetSelect,
        InternalArgs,
        MergeExtArgs,
        ModelKey,
        TypeMapCbDef,
        TypeMapDef,
        RequiredExtensionArgs as UserArgs
    }
}

/** $extends, defineExtension */
export declare interface ExtendsHook<Variant extends 'define' | 'extends', TypeMapCb extends TypeMapCbDef, ExtArgs extends Record<string, any>, TypeMap extends TypeMapDef = Call<TypeMapCb, {
    extArgs: ExtArgs;
}>> {
    extArgs: ExtArgs;
    <R_ extends {
        [K in '$allModels' | TypeMap['meta']['modelProps']]?: unknown;
    }, R, M_ extends {
        [K in '$allModels' | TypeMap['meta']['modelProps']]?: unknown;
    }, M, Q_ extends {
        [K in '$allModels' | '$allOperations' | keyof TypeMap['other']['operations'] | TypeMap['meta']['modelProps']]?: unknown;
    }, C_ extends {
        [K in string]?: unknown;
    }, C, Args extends InternalArgs = InternalArgs<R, M, {}, C>, MergedArgs extends InternalArgs = MergeExtArgs<TypeMap, ExtArgs, Args>>(extension: ((client: DynamicClientExtensionThis<TypeMap, TypeMapCb, ExtArgs>) => {
        $extends: {
            extArgs: Args;
        };
    }) | {
        client?: C & DynamicClientExtensionArgs<C_, TypeMap, TypeMapCb, ExtArgs>;
        model?: DynamicModelExtensionArgs<M_, TypeMap, TypeMapCb, ExtArgs> & M;
        name?: string;
        query?: DynamicQueryExtensionArgs<Q_, TypeMap>;
        result?: DynamicResultExtensionArgs<R_, TypeMap> & R;
    }): {
        define: (client: any) => {
            $extends: {
                extArgs: Args;
            };
        };
        extends: DynamicClientExtensionThis<Call<TypeMapCb, {
            extArgs: MergedArgs;
        }>, TypeMapCb, MergedArgs>;
    }[Variant];
}

export declare type ExtensionArgs = Optional<RequiredExtensionArgs>;

export declare type ExtractGlobalOmit<Options, ModelName extends string> = Options extends {
    omit: {
        [K in ModelName]: infer GlobalOmit;
    };
} ? GlobalOmit : {};

declare type Field = ReadonlyDeep_2<{
    dbName?: null | string;
    default?: FieldDefault | FieldDefaultScalar | FieldDefaultScalar[];
    documentation?: string;
    hasDefaultValue: boolean;
    isGenerated?: boolean;
    isId: boolean;
    isList: boolean;
    isReadOnly: boolean;
    isRequired: boolean;
    isUnique: boolean;
    isUpdatedAt?: boolean;
    kind: FieldKind;
    name: string;
    /**
     * Native database type, if specified.
     * For example, `@db.VarChar(191)` is encoded as `['VarChar', ['191']]`,
     * `@db.Text` is encoded as `['Text', []]`.
     */
    nativeType?: [string, string[]] | null;
    relationFromFields?: string[];
    relationName?: string;
    relationOnDelete?: string;
    relationOnUpdate?: string;
    relationToFields?: string[];
    /**
     * Describes the data type in the same the way it is defined in the Prisma schema:
     * BigInt, Boolean, Bytes, DateTime, Decimal, Float, Int, JSON, String, $ModelName
     */
    type: string;
}>;

declare type FieldDefault = ReadonlyDeep_2<{
    args: Array<number | string>;
    name: string;
}>;

declare type FieldDefaultScalar = boolean | number | string;

declare type FieldKind = 'enum' | 'object' | 'scalar' | 'unsupported';

declare type FieldLocation = 'enumTypes' | 'fieldRefTypes' | 'inputObjectTypes' | 'outputObjectTypes' | 'scalar';

declare type FieldNamespace = 'model' | 'prisma';

/**
 * A reference to a specific field of a specific model
 */
export declare interface FieldRef<Model, FieldType> {
    readonly isList: boolean;
    readonly modelName: Model;
    readonly name: string;
    readonly typeName: FieldType;
}

declare type FieldRefAllowType = TypeRef<'enumTypes' | 'scalar'>;

declare type FieldRefType = ReadonlyDeep_2<{
    allowTypes: FieldRefAllowType[];
    fields: SchemaArg[];
    name: string;
}>;

declare type FluentOperation = 'create' | 'delete' | 'findFirst' | 'findFirstOrThrow' | 'findUnique' | 'findUniqueOrThrow' | 'update' | 'upsert';

export declare interface Fn<Params = unknown, Returns = unknown> {
    params: Params;
    returns: Returns;
}

declare interface GeneratorConfig {
    binaryTargets: BinaryTargetsEnvValue[];
    config: {
        [key: string]: string | string[] | undefined;
    } & {
        /** `binaryTargets` is a reserved name and will only be available directly at `generator.binaryTargets` */
        binaryTargets?: never;
        /** `output` is a reserved name and will only be available directly at `generator.output` */
        output?: never;
        /** `previewFeatures` is a reserved name and will only be available directly at `generator.previewFeatures` */
        previewFeatures?: never;
        /** `provider` is a reserved name and will only be available directly at `generator.provider` */
        provider?: never;
    };
    envPaths?: EnvPaths;
    isCustomOutput?: boolean;
    name: string;
    output: EnvValue | null;
    previewFeatures: string[];
    provider: EnvValue;
    sourceFilePath: string;
}

export declare type GetAggregateResult<P extends OperationPayload, A> = {
    [K in keyof A as K extends Aggregate ? K : never]: K extends '_count' ? A[K] extends true ? number : Count<A[K]> : {
        [J in keyof A[K] & string]: null | P['scalars'][J];
    };
};

export declare type GetBatchResult = {
    count: number;
};

export declare type GetCountResult<A> = A extends {
    select: infer S;
} ? (S extends true ? number : Count<S>) : number;

export declare type GetFindResult<P extends OperationPayload, A, GlobalOmitOptions> = Equals<A, any> extends 1 ? DefaultSelection<P, A, GlobalOmitOptions> : A extends {
    include: infer I extends object;
} & Record<string, unknown> | {
    select: infer S extends object;
} & Record<string, unknown> ? {
    [K in keyof I | keyof S as (I & S)[K] extends false | null | Skip | undefined ? never : K]: (I & S)[K] extends object ? P extends SelectablePayloadFields<K, (infer O)[]> ? O extends OperationPayload ? GetFindResult<O, (I & S)[K], GlobalOmitOptions>[] : never : P extends SelectablePayloadFields<K, infer O | null> ? O extends OperationPayload ? GetFindResult<O, (I & S)[K], GlobalOmitOptions> | null & SelectField<P, K> : never : K extends '_count' ? Count<GetFindResult<P, (I & S)[K], GlobalOmitOptions>> : never : P extends SelectablePayloadFields<K, (infer O)[]> ? O extends OperationPayload ? DefaultSelection<O, {}, GlobalOmitOptions>[] : never : P extends SelectablePayloadFields<K, infer O | null> ? O extends OperationPayload ? DefaultSelection<O, {}, GlobalOmitOptions> | null & SelectField<P, K> : never : P extends {
        scalars: {
            [k in K]: infer O;
        };
    } ? O : K extends '_count' ? Count<P['objects']> : never;
} & (A extends {
    include: any;
} & Record<string, unknown> ? DefaultSelection<P, {
    omit: A['omit'];
} & A, GlobalOmitOptions> : unknown) : DefaultSelection<P, A, GlobalOmitOptions>;

export declare type GetGroupByResult<P extends OperationPayload, A> = A extends {
    by: string[];
} ? Array<{
    [K in A['by'][number]]: P['scalars'][K];
} & GetAggregateResult<P, A>> : A extends {
    by: string;
} ? Array<{
    [K in A['by']]: P['scalars'][K];
} & GetAggregateResult<P, A>> : {}[];

export declare type GetOmit<BaseKeys extends string, R extends InternalArgs['result'][string], ExtraType = never> = {
    [K in BaseKeys | (string extends keyof R ? never : keyof R)]?: boolean | ExtraType;
};

export declare type GetPayloadResult<Base extends Record<any, any>, R extends InternalArgs['result'][string]> = GetPayloadResultExtensionObject<R> & Omit<Base, GetPayloadResultExtensionKeys<R>>;

export declare type GetPayloadResultExtensionKeys<R extends InternalArgs['result'][string], KR extends keyof R = string extends keyof R ? never : keyof R> = KR;

export declare type GetPayloadResultExtensionObject<R extends InternalArgs['result'][string]> = {
    [K in GetPayloadResultExtensionKeys<R>]: R[K] extends () => {
        compute: (...args: any) => infer C;
    } ? C : never;
};

/**
 * Config that is stored into the generated client. When the generated client is
 * loaded, this same config is passed to {@link getPrismaClient} which creates a
 * closure with that config around a non-instantiated [[PrismaClient]].
 */
export declare type GetPrismaClientConfig = {
    activeProvider: ActiveConnectorType;
    /**
     * Information about the CI where the Prisma Client has been generated. The
     * name of the CI environment is stored at generation time because CI
     * information is not always available at runtime. Moreover, the edge client
     * has no notion of environment variables, so this works around that.
     * @remarks used to error for Vercel/Netlify for schema caching issues
     */
    ciName?: string;
    clientVersion: string;
    compilerWasm?: CompilerWasmLoadingConfig;
    /**
     * A boolean that is `false` when the client was generated with --no-engine. At
     * runtime, this means the client will be bound to be using the Data Proxy.
     */
    copyEngine?: boolean;
    datasourceNames: string[];
    dirname: string;
    engineVersion: string;
    /**
     * Optional wasm loading configuration
     */
    engineWasm?: EngineWasmLoadingConfig;
    generator?: GeneratorConfig;
    /**
     * A special env object just for the data proxy edge runtime.
     * Allows bundlers to inject their own env variables (Vercel).
     * Allows platforms to declare global variables as env (Workers).
     * @remarks only used for the purpose of data proxy
     */
    injectableEdgeEnv?: () => LoadedEnv;
    /**
     * The contents of the datasource url saved in a string.
     * This can either be an env var name or connection string.
     * It is needed by the client to connect to the Data Proxy.
     * @remarks only used for the purpose of data proxy
     */
    inlineDatasources: {
        [name in string]: {
            url: EnvValue;
        };
    };
    /**
     * The contents of the schema encoded into a string
     * @remarks only used for the purpose of data proxy
     */
    inlineSchema: string;
    /**
     * The string hash that was produced for a given schema
     * @remarks only used for the purpose of data proxy
     */
    inlineSchemaHash: string;
    /**
     * Information about whether we have not found a schema.prisma file in the
     * default location, and that we fell back to finding the schema.prisma file
     * in the current working directory. This usually means it has been bundled.
     */
    isBundled?: boolean;
    /**
     * A marker to indicate that the client was not generated via `prisma
     * generate` but was generated via `generate --postinstall` script instead.
     * @remarks used to error for Vercel/Netlify for schema caching issues
     */
    postinstall?: boolean;
    relativeEnvPaths?: {
        rootEnvPath?: null | string;
        schemaEnvPath?: null | string;
    };
    relativePath: string;
    runtimeDataModel: RuntimeDataModel;
};

export declare type GetResult<Payload extends OperationPayload, Args, OperationName extends Operation = 'findUniqueOrThrow', GlobalOmitOptions = {}> = {
    $executeRaw: number;
    $executeRawUnsafe: number;
    $queryRaw: unknown;
    $queryRawTyped: unknown;
    $queryRawUnsafe: unknown;
    $runCommandRaw: JsonObject;
    aggregate: GetAggregateResult<Payload, Args>;
    aggregateRaw: JsonObject;
    count: GetCountResult<Args>;
    create: GetFindResult<Payload, Args, GlobalOmitOptions>;
    createMany: GetBatchResult;
    createManyAndReturn: GetFindResult<Payload, Args, GlobalOmitOptions>[];
    delete: GetFindResult<Payload, Args, GlobalOmitOptions>;
    deleteMany: GetBatchResult;
    findFirst: GetFindResult<Payload, Args, GlobalOmitOptions> | null;
    findFirstOrThrow: GetFindResult<Payload, Args, GlobalOmitOptions>;
    findMany: GetFindResult<Payload, Args, GlobalOmitOptions>[];
    findRaw: JsonObject;
    findUnique: GetFindResult<Payload, Args, GlobalOmitOptions> | null;
    findUniqueOrThrow: GetFindResult<Payload, Args, GlobalOmitOptions>;
    groupBy: GetGroupByResult<Payload, Args>;
    update: GetFindResult<Payload, Args, GlobalOmitOptions>;
    updateMany: GetBatchResult;
    updateManyAndReturn: GetFindResult<Payload, Args, GlobalOmitOptions>[];
    upsert: GetFindResult<Payload, Args, GlobalOmitOptions>;
}[OperationName];

declare type GetRuntimeOutput = {
    id: RuntimeName;
    isEdge: boolean;
    prettyName: string;
};

export declare type GetSelect<Base extends Record<any, any>, R extends InternalArgs['result'][string], KR extends keyof R = string extends keyof R ? never : keyof R> = {
    [K in keyof Base | KR]?: K extends KR ? boolean : Base[K];
};

declare type GlobalOmitOptions = {
    [modelName: string]: {
        [fieldName: string]: boolean;
    };
};

declare type HandleErrorParams = {
    args: JsArgs;
    callsite?: CallSite;
    clientMethod: string;
    error: any;
    globalOmit?: GlobalOmitOptions;
    modelName?: string;
    transaction?: PrismaPromiseTransaction;
};

declare type HrTime = [number, number];

/**
 * Defines High-Resolution Time.
 *
 * The first number, HrTime[0], is UNIX Epoch time in seconds since 00:00:00 UTC on 1 January 1970.
 * The second number, HrTime[1], represents the partial second elapsed since Unix Epoch time represented by first number in nanoseconds.
 * For example, 2021-01-01T12:30:10.150Z in UNIX Epoch time in milliseconds is represented as 1609504210150.
 * The first number is calculated by converting and truncating the Epoch time in milliseconds to seconds:
 * HrTime[0] = Math.trunc(1609504210150 / 1000) = 1609504210.
 * The second number is calculated by converting the digits after the decimal point of the subtraction, (1609504210150 / 1000) - HrTime[0], to nanoseconds:
 * HrTime[1] = Number((1609504210.150 - HrTime[0]).toFixed(9)) * 1e9 = 150000000.
 * This is represented in HrTime format as [1609504210, 150000000].
 */
declare type HrTime_2 = [number, number];

declare type Index = ReadonlyDeep_2<{
    algorithm?: string;
    clustered?: boolean;
    dbName?: string;
    fields: IndexField[];
    isDefinedOnField: boolean;
    model: string;
    name?: string;
    type: IndexType;
}>;

declare type IndexField = ReadonlyDeep_2<{
    length?: number;
    name: string;
    operatorClass?: string;
    sortOrder?: SortOrder;
}>;

declare type IndexType = 'fulltext' | 'id' | 'normal' | 'unique';

/**
 * Matches a JSON array.
 * Unlike \`JsonArray\`, readonly arrays are assignable to this type.
 */
export declare interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {
}

/**
 * Matches a JSON object.
 * Unlike \`JsonObject\`, this type allows undefined and read-only properties.
 */
export declare type InputJsonObject = {
    readonly [Key in string]?: InputJsonValue | null;
};

/**
 * Matches any valid value that can be used as an input for operations like
 * create and update as the value of a JSON field. Unlike \`JsonValue\`, this
 * type allows read-only arrays and read-only object properties and disallows
 * \`null\` at the top level.
 *
 * \`null\` cannot be used as the value of a JSON field because its meaning
 * would be ambiguous. Use \`Prisma.JsonNull\` to store the JSON null value or
 * \`Prisma.DbNull\` to clear the JSON value and set the field to the database
 * NULL value instead.
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
 */
export declare type InputJsonValue = {
    toJSON(): unknown;
} | boolean | InputJsonArray | InputJsonObject | number | string;

declare type InputType = ReadonlyDeep_2<{
    constraints: {
        fields?: string[];
        maxNumFields: null | number;
        minNumFields: null | number;
    };
    fields: SchemaArg[];
    meta?: {
        grouping?: string;
        source?: string;
    };
    name: string;
}>;

declare type InputTypeRef = TypeRef<'enumTypes' | 'fieldRefTypes' | 'inputObjectTypes' | 'scalar'>;

declare type InteractiveTransactionInfo<Payload = unknown> = {
    /**
     * Transaction ID returned by the query engine.
     */
    id: string;
    /**
     * Arbitrary payload the meaning of which depends on the `Engine` implementation.
     * For example, `DataProxyEngine` needs to associate different API endpoints with transactions.
     * In `LibraryEngine` and `BinaryEngine` it is currently not used.
     */
    payload: Payload;
};

declare type InteractiveTransactionOptions<Payload> = Transaction_2.InteractiveTransactionInfo<Payload>;

export declare type InternalArgs<R = {
    [K in string]: {
        [K in string]: unknown;
    };
}, M = {
    [K in string]: {
        [K in string]: unknown;
    };
}, Q = {
    [K in string]: {
        [K in string]: unknown;
    };
}, C = {
    [K in string]: unknown;
}> = {
    client: {
        [K in keyof C]: () => C[K];
    };
    model: {
        [K in keyof M]: {
            [P in keyof M[K]]: () => M[K][P];
        };
    };
    query: {
        [K in keyof Q]: {
            [P in keyof Q[K]]: () => Q[K][P];
        };
    };
    result: {
        [K in keyof R]: {
            [P in keyof R[K]]: () => R[K][P];
        };
    };
};

declare type InternalRequestParams = {
    /** Used to "desugar" a user input into an "expanded" one */
    argsMapper?: (args?: UserArgs_2) => UserArgs_2;
    callsite?: CallSite;
    /**
     * The original client method being called.
     * Even though the rootField / operation can be changed,
     * this method stays as it is, as it's what the user's
     * code looks like
     */
    clientMethod: string;
    /** Used for Accelerate client extension via Data Proxy */
    customDataProxyFetch?: CustomDataProxyFetch;
    /**
     * Name of js model that triggered the request. Might be used
     * for warnings or error messages
     */
    jsModelName?: string;
    /** Used to convert args for middleware and back */
    middlewareArgsMapper?: MiddlewareArgsMapper<unknown, unknown>;
    otelParentCtx?: Context;
    transaction?: PrismaPromiseTransaction;
    unpacker?: Unpacker;
} & Omit<QueryMiddlewareParams, 'runInTransaction'>;

declare type IsolationLevel = 'READ COMMITTED' | 'READ UNCOMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE' | 'SNAPSHOT';

declare type IsolationLevel_2 = 'ReadCommitted' | 'ReadUncommitted' | 'RepeatableRead' | 'Serializable' | 'Snapshot';

export declare type ITXClientDenyList = (typeof denylist)[number];

declare function getBatchRequestPayload(batch: JsonQuery[], transaction?: TransactionOptions_2<unknown>): QueryEngineBatchRequest;

declare function getExtensionContext<T>(that: T): Context_2<T>;

export declare function getPrismaClient(config: GetPrismaClientConfig): {
    new (optionsArg?: PrismaClientOptions): {
        _accelerateEngineConfig: AccelerateEngineConfig;
        _activeProvider: string;
        /**
         * A fully constructed/applied Client that references the parent
         * PrismaClient. This is used for Client extensions only.
         */
        _appliedParent: any;
        _clientVersion: string;
        _connectionPromise?: Promise<any> | undefined;
        _createItxClient(transaction: PrismaPromiseInteractiveTransaction): Client;
        _createPrismaPromise: PrismaPromiseFactory;
        _disconnectionPromise?: Promise<any> | undefined;
        /**
         * @remarks This is used internally by Policy, do not rename or remove
         */
        _engine: Engine;
        _engineConfig: EngineConfig;
        _errorFormat: ErrorFormat;
        _executeRequest({ action, args, argsMapper, callsite, clientMethod, customDataProxyFetch, dataPath, model, otelParentCtx, transaction, unpacker, }: InternalRequestParams): Promise<any>;
        _extensions: MergedExtensionsList;
        _globalOmit?: GlobalOmitOptions | undefined;
        /**
         * Shortcut for checking a preview flag
         * @param feature preview flag
         * @returns
         */
        _hasPreviewFlag(feature: string): boolean;
        _middlewares: MiddlewareHandler<QueryMiddleware>;
        _originalClient: any;
        _previewFeatures: string[];
        /**
         * Runs the middlewares over params before executing a request
         * @param internalParams
         * @returns
         */
        _request(internalParams: InternalRequestParams): Promise<any>;
        _requestHandler: RequestHandler;
        _runtimeDataModel: RuntimeDataModel;
        _tracingHelper: TracingHelper;
        /**
         * Execute a batch of requests in a transaction
         * @param requests
         * @param options
         */
        _transactionWithArray({ options, promises, }: {
            options?: BatchTransactionOptions;
            promises: Array<PrismaPromise_2<any>>;
        }): Promise<any>;
        /**
         * Perform a long-running transaction
         * @param callback
         * @param options
         * @returns
         */
        _transactionWithCallback({ callback, options, }: {
            callback: (client: Client) => Promise<unknown>;
            options?: Options;
        }): Promise<unknown>;
        $applyPendingMigrations(): Promise<void>;
        $connect(): Promise<void>;
        /**
         * Disconnect from the database
         */
        $disconnect(): Promise<void>;
        /**
         * Executes a raw query provided through a safe tag function
         * @see https://github.com/prisma/prisma/issues/7142
         *
         * @param query
         * @param values
         * @returns
         */
        $executeRaw(query: Sql | TemplateStringsArray, ...values: any[]): PrismaPromise_2<unknown, any>;
        /**
         * Executes a raw query and always returns a number
         */
        $executeRawInternal(transaction: PrismaPromiseTransaction | undefined, clientMethod: string, args: RawQueryArgs, middlewareArgsMapper?: MiddlewareArgsMapper<unknown, unknown>): Promise<number>;
        /**
         * Unsafe counterpart of `$executeRaw` that is susceptible to SQL injections
         * @see https://github.com/prisma/prisma/issues/7142
         *
         * @param query
         * @param values
         * @returns
         */
        $executeRawUnsafe(query: string, ...values: RawValue[]): PrismaPromise_2<unknown, any>;
        $extends: typeof $extends;
        $metrics: MetricsClient;
        $on<E extends ExtendedEventType>(eventType: E, callback: EventCallback<E>): any;
        /**
         * Executes a raw query provided through a safe tag function
         * @see https://github.com/prisma/prisma/issues/7142
         *
         * @param query
         * @param values
         * @returns
         */
        $queryRaw(query: Sql | TemplateStringsArray, ...values: any[]): PrismaPromise_2<unknown, any>;
        /**
         * Executes a raw query and returns selected data
         */
        $queryRawInternal(transaction: PrismaPromiseTransaction | undefined, clientMethod: string, args: RawQueryArgs, middlewareArgsMapper?: MiddlewareArgsMapper<unknown, unknown>): Promise<any>;
        /**
         * Counterpart to $queryRaw, that returns strongly typed results
         * @param typedSql
         */
        $queryRawTyped(typedSql: UnknownTypedSql): PrismaPromise_2<unknown, any>;
        /**
         * Unsafe counterpart of `$queryRaw` that is susceptible to SQL injections
         * @see https://github.com/prisma/prisma/issues/7142
         *
         * @param query
         * @param values
         * @returns
         */
        $queryRawUnsafe(query: string, ...values: RawValue[]): PrismaPromise_2<unknown, any>;
        /**
         * Executes a raw command only for MongoDB
         *
         * @param command
         * @returns
         */
        $runCommandRaw(command: Record<string, JsInputValue>): PrismaPromise_2<unknown, any>;
        /**
         * Execute queries within a transaction
         * @param input a callback or a query list
         * @param options to set timeouts (callback)
         * @returns
         */
        $transaction(input: any, options?: any): Promise<any>;
        /**
         * Hook a middleware into the client
         * @param middleware to hook
         */
        $use(middleware: QueryMiddleware): void;
        readonly [Symbol.toStringTag]: string;
    };
};

export declare function getRuntime(): GetRuntimeOutput;

export declare const itxClientDenyList: readonly (string | symbol)[];

declare enum ModelAction {
    aggregate = "aggregate",
    aggregateRaw = "aggregateRaw",
    count = "count",// TODO: count does not actually exist in DMMF
    create = "create",
    createMany = "createMany",
    createManyAndReturn = "createManyAndReturn",
    delete = "delete",
    deleteMany = "deleteMany",
    findFirst = "findFirst",
    findFirstOrThrow = "findFirstOrThrow",
    findMany = "findMany",
    findRaw = "findRaw",
    findUnique = "findUnique",
    findUniqueOrThrow = "findUniqueOrThrow",
    groupBy = "groupBy",
    update = "update",
    updateMany = "updateMany",
    updateManyAndReturn = "updateManyAndReturn",
    upsert = "upsert"
}

declare interface Job {
    reject: (data: any) => void;
    request: any;
    resolve: (data: any) => void;
}

export declare type JsArgs = {
    [argName: string]: JsInputValue;
    include?: Selection_2;
    omit?: Omission;
    select?: Selection_2;
};

export declare type JsInputValue = {
    [key: string]: JsInputValue;
} | bigint | boolean | Date | DecimalJsLike | FieldRef<string, unknown> | JsInputValue[] | JsonConvertible | null | number | ObjectEnumValue | RawParameters | Skip | string | Uint8Array | undefined;

declare type JsonArgumentValue = {
    [key: string]: JsonArgumentValue;
} | boolean | JsonArgumentValue[] | null | number | RawTaggedValue | string;

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {
}

export declare type JsonBatchQuery = {
    batch: JsonQuery[];
    transaction?: {
        isolationLevel?: IsolationLevel_2;
    };
};

export declare interface JsonConvertible {
    toJSON(): unknown;
}

declare type JsonFieldSelection = {
    arguments?: RawTaggedValue | Record<string, JsonArgumentValue>;
    selection: JsonSelectionSet;
};

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
export declare type JsonObject = {
    [Key in string]?: JsonValue;
};

export declare type JsonQuery = {
    action: JsonQueryAction;
    modelName?: string;
    query: JsonFieldSelection;
};

declare type JsonQueryAction = 'aggregate' | 'aggregateRaw' | 'createMany' | 'createManyAndReturn' | 'createOne' | 'deleteMany' | 'deleteOne' | 'executeRaw' | 'findFirst' | 'findFirstOrThrow' | 'findMany' | 'findRaw' | 'findUnique' | 'findUniqueOrThrow' | 'groupBy' | 'queryRaw' | 'runCommandRaw' | 'updateMany' | 'updateManyAndReturn' | 'updateOne' | 'upsertOne';

declare type JsonSelectionSet = {
    [fieldName: string]: boolean | JsonFieldSelection;
} & {
    $composites?: boolean;
    $scalars?: boolean;
};

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = boolean | JsonArray | JsonObject | null | number | string;

export declare type JsOutputValue = {
    [key: string]: JsOutputValue;
} | bigint | boolean | Date | Decimal | JsOutputValue[] | null | number | string | Uint8Array;

export declare type JsPromise<T> = {} & Promise<T>;

declare type KnownErrorParams = {
    batchRequestIdx?: number;
    clientVersion: string;
    code: string;
    meta?: Record<string, unknown>;
};

/**
 * A pointer from the current {@link Span} to another span in the same trace or
 * in a different trace.
 * Few examples of Link usage.
 * 1. Batch Processing: A batch of elements may contain elements associated
 *    with one or more traces/spans. Since there can only be one parent
 *    SpanContext, Link is used to keep reference to SpanContext of all
 *    elements in the batch.
 * 2. Public Endpoint: A SpanContext in incoming client request on a public
 *    endpoint is untrusted from service provider perspective. In such case it
 *    is advisable to start a new trace with appropriate sampling decision.
 *    However, it is desirable to associate incoming SpanContext to new trace
 *    initiated on service provider side so two traces (from Client and from
 *    Service Provider) can be correlated.
 */
declare interface Link {
    /** A set of {@link SpanAttributes} on the link. */
    attributes?: SpanAttributes;
    /** The {@link SpanContext} of a linked span. */
    context: SpanContext;
    /** Count of attributes of the link that were dropped due to collection limits */
    droppedAttributesCount?: number;
}

declare type LoadedEnv = {
    message?: string;
    parsed: {
        [x: string]: string;
    };
} | undefined;

declare type LocationInFile = {
    columnNumber: null | number;
    fileName: string;
    lineNumber: null | number;
};

declare type LogDefinition = {
    emit: 'event' | 'stdout';
    level: LogLevel;
};

/**
 * Typings for the events we emit.
 *
 * @remarks
 * If this is updated, our edge runtime shim needs to be updated as well.
 */
declare type LogEmitter = {
    emit(event: QueryEventType, payload: QueryEvent): boolean;
    emit(event: LogEventType, payload: LogEvent): boolean;
    on<E extends EngineEventType>(event: E, listener: (event: EngineEvent<E>) => void): LogEmitter;
};

declare type LogEvent = {
    message: string;
    target: string;
    timestamp: Date;
};

declare type LogEventType = 'error' | 'info' | 'warn';

declare type LogLevel = 'error' | 'info' | 'query' | 'warn';

declare type Mappings = ReadonlyDeep_2<{
    modelOperations: ModelMapping[];
    otherOperations: {
        read: string[];
        write: string[];
    };
}>;

export declare type MergeExtArgs<TypeMap extends TypeMapDef, ExtArgs extends Record<any, any>, Args extends Record<any, any>> = ComputeDeep<AllModelsToStringIndex<TypeMap, Args, 'model'> & AllModelsToStringIndex<TypeMap, Args, 'result'> & Args & ExtArgs>;

export declare type Metric<T> = {
    description: string;
    key: string;
    labels: Record<string, string>;
    value: T;
};

export declare type MetricHistogram = {
    buckets: MetricHistogramBucket[];
    count: number;
    sum: number;
};

export declare type MetricHistogramBucket = [maxValue: number, count: number];

export declare type Metrics = {
    counters: Metric<number>[];
    gauges: Metric<number>[];
    histograms: Metric<MetricHistogram>[];
};

declare type MetricsOptions = {
    /**
     * Labels to add to every metrics in key-value format
     */
    globalLabels?: Record<string, string>;
};

declare type MetricsOptionsCommon = {
    globalLabels?: Record<string, string>;
};

declare type MetricsOptionsJson = {
    format: 'json';
} & MetricsOptionsCommon;

declare type MetricsOptionsPrometheus = {
    format: 'prometheus';
} & MetricsOptionsCommon;

declare type MiddlewareArgsMapper<RequestArgs, MiddlewareArgs> = {
    middlewareArgsToRequestArgs(middlewareArgs: MiddlewareArgs): RequestArgs;
    requestArgsToMiddlewareArgs(requestArgs: RequestArgs): MiddlewareArgs;
};

declare type Model = ReadonlyDeep_2<{
    dbName: null | string;
    documentation?: string;
    fields: Field[];
    isGenerated?: boolean;
    name: string;
    primaryKey: null | PrimaryKey;
    schema: null | string;
    uniqueFields: string[][];
    uniqueIndexes: uniqueIndex[];
}>;

export declare type ModelArg = {
    [MethodName in string]: unknown;
};

export declare type ModelArgs = {
    model: {
        [ModelName in string]: ModelArg;
    };
};

export declare type ModelKey<TypeMap extends TypeMapDef, M extends PropertyKey> = M extends keyof TypeMap['model'] ? M : Capitalize<M & string>;

declare type ModelMapping = ReadonlyDeep_2<{
    aggregate?: null | string;
    aggregateRaw?: null | string;
    count?: null | string;
    create?: null | string;
    createMany?: null | string;
    createManyAndReturn?: null | string;
    delete?: null | string;
    deleteMany?: null | string;
    findFirst?: null | string;
    findFirstOrThrow?: null | string;
    findMany?: null | string;
    findRaw?: null | string;
    findUnique?: null | string;
    findUniqueOrThrow?: null | string;
    groupBy?: null | string;
    model: string;
    plural: string;
    update?: null | string;
    updateMany?: null | string;
    updateManyAndReturn?: null | string;
    upsert?: null | string;
}>;

export declare type ModelQueryOptionsCb = (args: ModelQueryOptionsCbArgs) => Promise<any>;

export declare type ModelQueryOptionsCbArgs = {
    args: JsArgs;
    model: string;
    operation: string;
    query: (args: JsArgs) => Promise<unknown>;
};

declare type MultiBatchResponse = {
    plans: object[];
    type: 'multi';
};

export declare type NameArgs = {
    name?: string;
};

export declare type Narrow<A> = {
    [K in keyof A]: A[K] extends Function ? A[K] : Narrow<A[K]>;
} | (A extends Narrowable ? A : never);

export declare type Narrowable = [] | bigint | boolean | number | string;

export declare type NeverToUnknown<T> = [T] extends [never] ? unknown : T;

declare class JsonNull extends NullTypesEnumValue {
    #private;
}

/**
 * Class that holds the list of all extensions, applied to particular instance,
 * as well as resolved versions of the components that need to apply on
 * different levels. Main idea of this class: avoid re-resolving as much of the
 * stuff as possible when new extensions are added while also delaying the
 * resolve until the point it is actually needed. For example, computed fields
 * of the model won't be resolved unless the model is actually queried. Neither
 * adding extensions with `client` component only cause other components to
 * recompute.
 */
declare class MergedExtensionsList {
    private head?;
    private constructor();
    static empty(): MergedExtensionsList;
    static single(extension: ExtensionArgs): MergedExtensionsList;
    append(extension: ExtensionArgs): MergedExtensionsList;
    getAllBatchQueryCallbacks(): BatchQueryOptionsCb[];
    getAllClientExtensions(): ClientArg | undefined;
    getAllComputedFields(dmmfModelName: string): ComputedFieldsMap | undefined;
    getAllModelExtensions(dmmfModelName: string): ModelArg | undefined;
    getAllQueryCallbacks(jsModelName: string, operation: string): any;
    isEmpty(): boolean;
}

export declare class MetricsClient {
    private _client;
    constructor(client: Client);
    /**
     * Returns all metrics gathered up to this point in prometheus format.
     *
     * @param options
     * @returns
     */
    json(options?: MetricsOptions): Promise<Metrics>;
    /**
     * Returns all metrics gathered up to this point in prometheus format.
     * Result of this call can be exposed directly to prometheus scraping endpoint
     *
     * @param options
     * @returns
     */
    prometheus(options?: MetricsOptions): Promise<string>;
}

declare class MiddlewareHandler<M extends Function> {
    private _middlewares;
    get(id: number): M | undefined;
    has(id: number): boolean;
    length(): number;
    use(middleware: M): void;
}

declare function isSkip(value: unknown): value is Skip;

export declare function isTypedSql(value: unknown): value is UnknownTypedSql;

/**
 * Create a SQL query for a list of values.
 */
export declare function join(values: readonly RawValue[], separator?: string, prefix?: string, suffix?: string): Sql;

/**
 * Generates more strict variant of an enum which, unlike regular enum,
 * throws on non-existing property access. This can be useful in following situations:
 * - we have an API, that accepts both `undefined` and `SomeEnumType` as an input
 * - enum values are generated dynamically from DMMF.
 *
 * In that case, if using normal enums and no compile-time typechecking, using non-existing property
 * will result in `undefined` value being used, which will be accepted. Using strict enum
 * in this case will help to have a runtime exception, telling you that you are probably doing something wrong.
 *
 * Note: if you need to check for existence of a value in the enum you can still use either
 * `in` operator or `hasOwnProperty` function.
 *
 * @param definition
 * @returns
 */
export declare function makeStrictEnum<T extends Record<PropertyKey, number | string>>(definition: T): T;

export declare function makeTypedQueryFactory(sql: string): (...values: any[]) => TypedSql<any[], unknown>;

export declare const objectEnumValues: {
    classes: {
        AnyNull: typeof AnyNull;
        DbNull: typeof DbNull;
        JsonNull: typeof JsonNull;
    };
    instances: {
        AnyNull: AnyNull;
        DbNull: DbNull;
        JsonNull: JsonNull;
    };
};

declare const officialPrismaAdapters: readonly ["@prisma/adapter-planetscale", "@prisma/adapter-neon", "@prisma/adapter-libsql", "@prisma/adapter-d1", "@prisma/adapter-pg", "@prisma/adapter-mssql"];

export declare type Omission = Record<string, boolean | Skip>;

declare type Omit_2<T, K extends number | string | symbol> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};
export { Omit_2 as Omit }

export declare type OmitValue<Omit, Key> = Key extends keyof Omit ? Omit[Key] : false;

export declare type Operation = '$executeRaw' | '$executeRawUnsafe' | '$queryRaw' | '$queryRawUnsafe' | '$runCommandRaw' | 'aggregate' | 'aggregateRaw' | 'count' | 'create' | 'createMany' | 'createManyAndReturn' | 'delete' | 'deleteMany' | 'findFirst' | 'findFirstOrThrow' | 'findMany' | 'findRaw' | 'findUnique' | 'findUniqueOrThrow' | 'groupBy' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert';

export declare type OperationPayload = {
    composites: {
        [CompositeName in string]: unknown;
    };
    name: string;
    objects: {
        [ObjectName in string]: unknown;
    };
    scalars: {
        [ScalarName in string]: unknown;
    };
};

export declare type Optional<O, K extends keyof any = keyof O> = {
    [P in Exclude<keyof O, K>]: O[P];
} & {
    [P in K & keyof O]?: O[P];
};

export declare type OptionalFlat<T> = {
    [K in keyof T]?: T[K];
};

export declare type OptionalKeys<O> = {
    [K in keyof O]-?: {} extends Pick_2<O, K> ? K : never;
}[keyof O];

declare type Options = {
    /** Transaction isolation level */
    isolationLevel?: IsolationLevel_2;
    /** Timeout for starting the transaction */
    maxWait?: number;
    /** Timeout for the transaction body */
    timeout?: number;
};

declare type Options_2 = {
    clientVersion: string;
};

export declare type Or<A extends 0 | 1, B extends 0 | 1> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[A][B];

declare type OtherOperationMappings = ReadonlyDeep_2<{
    read: string[];
    write: string[];
}>;

declare type OutputType = ReadonlyDeep_2<{
    fields: SchemaField[];
    name: string;
}>;

declare type OutputTypeRef = TypeRef<'enumTypes' | 'outputObjectTypes' | 'scalar'>;

export declare type Param<out $Type, $Value extends string> = {
    readonly name: $Value;
};

export declare type PatchFlat<O1, O2> = O1 & Omit_2<O2, keyof O1>;

export declare type Path<O, P, Default = never> = O extends unknown ? P extends [infer K, ...infer R] ? K extends keyof O ? Path<O[K], R> : Default : O : never;

export declare type Payload<T, F extends Operation = never> = T extends {
    [K: symbol]: {
        types: {
            payload: any;
        };
    };
} ? T[symbol]['types']['payload'] : any;

export declare type PayloadToResult<P, O extends Record_2<any, any> = RenameAndNestPayloadKeys<P>> = {
    [K in keyof O]?: O[K][K] extends any[] ? PayloadToResult<O[K][K][number]>[] : O[K][K] extends object ? PayloadToResult<O[K][K]> : O[K][K];
};

declare type Pick_2<T, K extends number | string | symbol> = {
    [P in keyof T as P extends K ? P : never]: T[P];
};

declare type PrimaryKey = ReadonlyDeep_2<{
    fields: string[];
    name: null | string;
}>;
export { Pick_2 as Pick }

export declare type PrismaClientOptions = {
    /**
     * @internal
     * You probably don't want to use this. \`__internal\` is used by internal tooling.
     */
    __internal?: {
        /** This can be used for testing purposes */
        configOverride?: (config: GetPrismaClientConfig) => GetPrismaClientConfig;
        debug?: boolean;
        engine?: {
            allowTriggerPanic?: boolean;
            binaryPath?: string;
            cwd?: string;
            endpoint?: string;
        };
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale.
     */
    adapter?: null | SqlDriverAdapterFactory;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the primary datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * \`\`\`
     * // Defaults to stdout
     * log: ['query', 'info', 'warn']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     * ]
     * \`\`\`
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogDefinition | LogLevel>;
    omit?: GlobalOmitOptions;
    /**
     * The default values for Transaction options
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: Transaction_2.Options;
};

declare type PrismaOperationSpec<TArgs, TAction = string> = {
    action: TAction;
    args: TArgs;
    model: string;
};

export declare interface PrismaPromise<T> extends Promise<T> {
    [Symbol.toStringTag]: 'PrismaPromise';
}

/**
 * Prisma's `Promise` that is backwards-compatible. All additions on top of the
 * original `Promise` are optional so that it can be backwards-compatible.
 * @see [[createPrismaPromise]]
 */
declare interface PrismaPromise_2<TResult, TSpec extends PrismaOperationSpec<unknown> = any> extends Promise<TResult> {
    /**
     * Extension of the original `.catch` function
     * @param onrejected same as regular promises
     * @param transaction transaction options
     */
    catch<R = never>(onrejected?: ((reason: any) => PromiseLike<R> | R) | null | undefined, transaction?: PrismaPromiseTransaction): Promise<R | TResult>;
    /**
     * Extension of the original `.finally` function
     * @param onfinally same as regular promises
     * @param transaction transaction options
     */
    finally(onfinally?: (() => void) | null | undefined, transaction?: PrismaPromiseTransaction): Promise<TResult>;
    /**
     * Called when executing a batch of regular tx
     * @param transaction transaction options for batch tx
     */
    requestTransaction?(transaction: PrismaPromiseBatchTransaction): PromiseLike<unknown>;
    get spec(): TSpec;
    /**
     * Extension of the original `.then` function
     * @param onfulfilled same as regular promises
     * @param onrejected same as regular promises
     * @param transaction transaction options
     */
    then<R1 = TResult, R2 = never>(onfulfilled?: (value: TResult) => PromiseLike<R1> | R1, onrejected?: (error: unknown) => PromiseLike<R2> | R2, transaction?: PrismaPromiseTransaction): Promise<R1 | R2>;
}

declare type PrismaPromiseBatchTransaction = {
    id: number;
    index: number;
    isolationLevel?: IsolationLevel_2;
    kind: 'batch';
    lock: PromiseLike<void>;
};

declare type PrismaPromiseCallback = (transaction?: PrismaPromiseTransaction) => Promise<unknown>;

/**
 * Creates a [[PrismaPromise]]. It is Prisma's implementation of `Promise` which
 * is essentially a proxy for `Promise`. All the transaction-compatible client
 * methods return one, this allows for pre-preparing queries without executing
 * them until `.then` is called. It's the foundation of Prisma's query batching.
 * @param callback that will be wrapped within our promise implementation
 * @see [[PrismaPromise]]
 * @returns
 */
declare type PrismaPromiseFactory = <T extends PrismaOperationSpec<unknown>>(callback: PrismaPromiseCallback, op?: T) => PrismaPromise_2<unknown>;

declare type PrismaPromiseInteractiveTransaction<PayloadType = unknown> = {
    id: string;
    kind: 'itx';
    payload: PayloadType;
};

declare type PrismaPromiseTransaction<PayloadType = unknown> = PrismaPromiseBatchTransaction | PrismaPromiseInteractiveTransaction<PayloadType>;

export declare class PrismaClientInitializationError extends Error {
    clientVersion: string;
    errorCode?: string;
    retryable?: boolean;
    get [Symbol.toStringTag](): string;
    constructor(message: string, clientVersion: string, errorCode?: string);
}

export declare class PrismaClientKnownRequestError extends Error implements ErrorWithBatchIndex {
    batchRequestIdx?: number;
    clientVersion: string;
    code: string;
    meta?: Record<string, unknown>;
    get [Symbol.toStringTag](): string;
    constructor(message: string, { batchRequestIdx, clientVersion, code, meta }: KnownErrorParams);
}

export declare class PrismaClientRustPanicError extends Error {
    clientVersion: string;
    get [Symbol.toStringTag](): string;
    constructor(message: string, clientVersion: string);
}

export declare class PrismaClientUnknownRequestError extends Error implements ErrorWithBatchIndex {
    batchRequestIdx?: number;
    clientVersion: string;
    get [Symbol.toStringTag](): string;
    constructor(message: string, { batchRequestIdx, clientVersion }: UnknownErrorParams);
}

export declare class PrismaClientValidationError extends Error {
    clientVersion: string;
    name: string;
    get [Symbol.toStringTag](): string;
    constructor(message: string, { clientVersion }: Options_2);
}

export declare function Param<$Type, $Value extends string>(name: $Value): Param<$Type, $Value>;

declare function prismaGraphQLToJSError({ error, user_facing_error }: RequestError, clientVersion: string, activeProvider: string): PrismaClientKnownRequestError | PrismaClientUnknownRequestError;

export declare const PrivateResultType: unique symbol;

declare type Provider = 'mysql' | 'postgres' | 'sqlite' | 'sqlserver';

declare namespace Public {
    export {
        validator
    }
}
export { Public }

declare namespace Public_2 {
    export {
        Args,
        Exact,
        Operation,
        Payload,
        PrismaPromise,
        Result
    }
}

declare type Query = ReadonlyDeep_2<{
    args: SchemaArg[];
    name: string;
    output: QueryOutput;
}>;

declare interface Queryable<Query, Result> extends AdapterInfo {
    /**
     * Execute a query and return the number of affected rows.
     */
    executeRaw(params: Query): Promise<number>;
    /**
     * Execute a query and return its result.
     */
    queryRaw(params: Query): Promise<Result>;
}

declare type QueryCompiler = {
    compile(request: string): {};
    compileBatch(batchRequest: string): BatchResponse;
};

declare interface QueryCompilerConstructor {
    new (options: QueryCompilerOptions): QueryCompiler;
}

declare type QueryCompilerOptions = {
    connectionInfo: ConnectionInfo;
    datamodel: string;
    provider: Provider;
};

declare type QueryEngineBatchGraphQLRequest = {
    batch: QueryEngineRequest[];
    isolationLevel?: IsolationLevel_2;
    transaction?: boolean;
};

declare type QueryEngineBatchRequest = JsonBatchQuery | QueryEngineBatchGraphQLRequest;

declare type QueryEngineConfig = {
    configDir: string;
    datamodel: string;
    datasourceOverrides: Record<string, string>;
    enableTracing: boolean;
    engineProtocol: QueryEngineProtocol;
    env: Record<string, string | undefined>;
    ignoreEnvVarErrors: boolean;
    logLevel: QueryEngineLogLevel;
    logQueries: boolean;
};

declare interface QueryEngineConstructor {
    new (config: QueryEngineConfig, logger: (log: string) => void, adapter?: ErrorCapturingSqlDriverAdapter): QueryEngineInstance;
}

declare type QueryEngineInstance = {
    applyPendingMigrations?(): Promise<void>;
    commitTransaction(id: string, traceHeaders: string, requestId: string): Promise<string>;
    connect(headers: string, requestId: string): Promise<void>;
    disconnect(headers: string, requestId: string): Promise<void>;
    metrics?(options: string): Promise<string>;
    /**
     * @param requestStr JSON.stringified `QueryEngineRequest | QueryEngineBatchRequest`
     * @param headersStr JSON.stringified `QueryEngineRequestHeaders`
     */
    query(requestStr: string, headersStr: string, transactionId: string | undefined, requestId: string): Promise<string>;
    rollbackTransaction(id: string, traceHeaders: string, requestId: string): Promise<string>;
    sdlSchema?(): Promise<string>;
    startTransaction(options: string, traceHeaders: string, requestId: string): Promise<string>;
    trace(requestId: string): Promise<null | string>;
};

declare type QueryEngineLogLevel = 'debug' | 'error' | 'info' | 'off' | 'trace' | 'warn';

declare type QueryEngineProtocol = 'graphql' | 'json';

declare type QueryEngineRequest = {
    query: string;
    variables: object;
};

declare type QueryEngineResultData<T> = {
    data: T;
};

declare type QueryEvent = {
    duration: number;
    params: string;
    query: string;
    target: string;
    timestamp: Date;
};

declare type QueryEventType = 'query';

declare type QueryIntrospectionBuiltinType = 'bigint-array' | 'bigint' | 'bool-array' | 'bool' | 'bytes-array' | 'bytes' | 'char-array' | 'char' | 'date-array' | 'date' | 'datetime-array' | 'datetime' | 'decimal-array' | 'decimal' | 'double-array' | 'double' | 'enum' | 'float-array' | 'float' | 'int-array' | 'int' | 'json-array' | 'json' | 'null' | 'string-array' | 'string' | 'time-array' | 'time' | 'unknown' | 'uuid-array' | 'uuid' | 'xml-array' | 'xml';

declare type QueryMiddleware = (params: QueryMiddlewareParams, next: (params: QueryMiddlewareParams) => Promise<unknown>) => Promise<unknown>;

declare type QueryMiddlewareParams = {
    /** The action that is being handled */
    action: Action;
    args?: UserArgs_2;
    /** TODO what is this */
    dataPath: string[];
    /** The model this is executed on */
    model?: string;
    /** TODO what is this */
    runInTransaction: boolean;
};

export declare type QueryOptions = {
    query: {
        [ModelName in string]: {
            [ModelAction in string]: ModelQueryOptionsCb;
        } | QueryOptionsCb;
    };
};

export declare type QueryOptionsCb = (args: QueryOptionsCbArgs) => Promise<any>;

export declare type QueryOptionsCbArgs = {
    args: JsArgs | RawQueryArgs;
    model?: string;
    operation: string;
    query: (args: JsArgs | RawQueryArgs) => Promise<unknown>;
};

declare type QueryOutput = ReadonlyDeep_2<{
    isList: boolean;
    isRequired: boolean;
    name: string;
}>;

export declare type RawParameters = {
    __prismaRawParameters__: true;
    values: string;
};

export declare type RawQueryArgs = [query: string, ...values: RawValue[]] | Sql | UnknownTypedSql;

declare type RawResponse = {
    columns: string[];
    rows: unknown[][];
    types: QueryIntrospectionBuiltinType[];
};

declare type RawTaggedValue = {
    $type: 'Raw';
    value: unknown;
};

/**
 * Supported value or SQL instance.
 */
export declare type RawValue = Sql | Value;

export declare type ReadonlyDeep<T> = {
    readonly [K in keyof T]: ReadonlyDeep<T[K]>;
};

declare type ReadonlyDeep_2<O> = {
    +readonly [K in keyof O]: ReadonlyDeep_2<O[K]>;
};

declare type Record_2<T extends number | string | symbol, U> = {
    [P in T]: U;
};

export declare type RenameAndNestPayloadKeys<P> = {
    [K in keyof P as K extends 'composites' | 'objects' | 'scalars' ? keyof P[K] : never]: P[K];
};
export { Record_2 as Record }

declare type RequestBatchOptions<InteractiveTransactionPayload> = {
    containsWrite: boolean;
    customDataProxyFetch?: CustomDataProxyFetch;
    numTry?: number;
    traceparent?: string;
    transaction?: TransactionOptions_2<InteractiveTransactionPayload>;
};

declare interface RequestError {
    error: string;
    user_facing_error: {
        batch_request_idx?: number;
        error_code?: string;
        is_panic: boolean;
        message: string;
        meta?: Record<string, unknown>;
    };
}

declare type RequestOptions<InteractiveTransactionPayload> = {
    customDataProxyFetch?: CustomDataProxyFetch;
    interactiveTransaction?: InteractiveTransactionOptions<InteractiveTransactionPayload>;
    isWrite: boolean;
    numTry?: number;
    traceparent?: string;
};

declare type RequestParams = {
    action: Action;
    args?: any;
    callsite?: CallSite;
    clientMethod: string;
    customDataProxyFetch?: CustomDataProxyFetch;
    dataPath: string[];
    extensions: MergedExtensionsList;
    globalOmit?: GlobalOmitOptions;
    headers?: Record<string, string>;
    modelName?: string;
    otelChildCtx?: Context;
    otelParentCtx?: Context;
    protocolQuery: JsonQuery;
    transaction?: PrismaPromiseTransaction;
    unpacker?: Unpacker;
};

declare type RequiredExtensionArgs = ClientArgs & ModelArgs & NameArgs & QueryOptions & ResultArgs;

export declare type RequiredKeys<O> = {
    [K in keyof O]-?: {} extends Pick_2<O, K> ? never : K;
}[keyof O];

export declare type Result<T, A, F extends Operation> = T extends {
    [K: symbol]: {
        types: {
            payload: any;
        };
    };
} ? GetResult<T[symbol]['types']['payload'], A, F> : GetResult<{
    composites: {};
    name: '';
    objects: {};
    scalars: {};
}, {}, F>;
export { RequiredExtensionArgs }
export { RequiredExtensionArgs as UserArgs }

export declare type Result_2<T, A, F extends Operation> = Result<T, A, F>;

declare class RequestHandler {
    client: Client;
    dataloader: DataLoader<RequestParams>;
    get [Symbol.toStringTag](): string;
    private logEmitter?;
    constructor(client: Client, logEmitter?: LogEmitter);
    /**
     * Handles the error and logs it, logging the error is done synchronously waiting for the event
     * handlers to finish.
     */
    handleAndLogRequestError(params: HandleErrorParams): never;
    handleRequestError({ args, callsite, clientMethod, error, globalOmit, modelName, transaction, }: HandleErrorParams): never;
    mapQueryEngineResult({ dataPath, unpacker }: RequestParams, response: QueryEngineResultData<any>): any;
    request(params: RequestParams): Promise<any>;
    sanitizeMessage(message: any): any;
    unpack(data: unknown, dataPath: string[], unpacker?: Unpacker): any;
}

/**
 * Create raw SQL statement.
 */
export declare function raw(value: string): Sql;

declare function resolveDatasourceUrl({ clientVersion, env, inlineDatasources, overrideDatasources, }: {
    clientVersion: string;
    env: Record<string, string | undefined>;
    inlineDatasources: GetPrismaClientConfig['inlineDatasources'];
    overrideDatasources: Datasources;
}): string;

declare namespace Result_3 {
    export {
        Aggregate,
        ApplyOmit,
        Count,
        DefaultSelection,
        ExtractGlobalOmit,
        GetAggregateResult,
        GetBatchResult,
        GetCountResult,
        GetFindResult,
        GetGroupByResult,
        GetResult,
        OmitValue,
        SelectablePayloadFields,
        SelectField,
        UnwrapPayload
    }
}

declare type Result_4<T> = {
    flatMap<U>(fn: (value: T) => Result_4<U>): Result_4<U>;
    map<U>(fn: (value: T) => U): Result_4<U>;
} & ({
    readonly error: Error_2;
    readonly ok: false;
} | {
    readonly ok: true;
    readonly value: T;
});

export declare type ResultArg = {
    [FieldName in string]: ResultFieldDefinition;
};

export declare type ResultArgs = {
    result: {
        [ModelName in string]: ResultArg;
    };
};

export declare type ResultArgsFieldCompute = (model: any) => unknown;

export declare type ResultFieldDefinition = {
    compute: ResultArgsFieldCompute;
    needs?: {
        [FieldName in string]: boolean;
    };
};

export declare type Return<T> = T extends (...args: any[]) => infer R ? R : T;

export declare type RuntimeDataModel = {
    readonly enums: Record<string, RuntimeEnum>;
    readonly models: Record<string, RuntimeModel>;
    readonly types: Record<string, RuntimeModel>;
};

declare type RuntimeEnum = Omit<DMMF_2.DatamodelEnum, 'name'>;

declare type RuntimeModel = Omit<DMMF_2.Model, 'name'>;

declare type RuntimeName = '' | 'bun' | 'deno' | 'edge-light' | 'netlify' | 'node' | 'workerd';

declare type Schema = ReadonlyDeep_2<{
    enumTypes: {
        model?: SchemaEnum[];
        prisma: SchemaEnum[];
    };
    fieldRefTypes: {
        prisma?: FieldRefType[];
    };
    inputObjectTypes: {
        model?: InputType[];
        prisma: InputType[];
    };
    outputObjectTypes: {
        model: OutputType[];
        prisma: OutputType[];
    };
    rootMutationType?: string;
    rootQueryType?: string;
}>;

declare type SchemaArg = ReadonlyDeep_2<{
    comment?: string;
    deprecation?: Deprecation;
    inputTypes: InputTypeRef[];
    isNullable: boolean;
    isRequired: boolean;
    name: string;
}>;

declare type SchemaEnum = ReadonlyDeep_2<{
    name: string;
    values: string[];
}>;

declare type SchemaField = ReadonlyDeep_2<{
    args: SchemaArg[];
    deprecation?: Deprecation;
    documentation?: string;
    isNullable?: boolean;
    name: string;
    outputType: OutputTypeRef;
}>;

export declare type Select<T, U> = T extends U ? T : never;

export declare type SelectablePayloadFields<K extends PropertyKey, O> = {
    composites: {
        [k in K]: O;
    };
} | {
    objects: {
        [k in K]: O;
    };
};

export declare type SelectField<P extends SelectablePayloadFields<any, any>, K extends PropertyKey> = P extends {
    objects: Record<K, any>;
} ? P['objects'][K] : P extends {
    composites: Record<K, any>;
} ? P['composites'][K] : never;

declare type Selection_2 = Record<string, boolean | JsArgs | Skip>;
export { Selection_2 as Selection }

declare type SerializeParams = {
    action: Action;
    args?: JsArgs;
    callsite?: CallSite;
    clientMethod: string;
    clientVersion: string;
    errorFormat: ErrorFormat;
    extensions?: MergedExtensionsList;
    globalOmit?: GlobalOmitOptions;
    modelName?: string;
    previewFeatures: string[];
    runtimeDataModel: RuntimeDataModel;
};

declare class Skip {
    constructor(param?: symbol);
    ifUndefined<T>(value: T | undefined): Skip | T;
}

export declare function serializeJsonQuery({ action, args, callsite, clientMethod, clientVersion, errorFormat, extensions, globalOmit, modelName, previewFeatures, runtimeDataModel, }: SerializeParams): JsonQuery;

export declare const skip: Skip;

declare enum SpanKind {
    /**
     * Indicates that the span covers the client-side wrapper around an RPC or
     * other remote request.
     */
    CLIENT = 2,
    /**
     * Indicates that the span describes consumer receiving a message from a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */
    CONSUMER = 4,
    /** Default value. Indicates that the span is used internally. */
    INTERNAL = 0,
    /**
     * Indicates that the span describes producer sending a message to a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */
    PRODUCER = 3,
    /**
     * Indicates that the span covers server-side handling of an RPC or other
     * remote request.
     */
    SERVER = 1
}

/**
 * An enumeration of status codes.
 */
declare enum SpanStatusCode {
    /**
     * The operation contains an error.
     */
    ERROR = 2,
    /**
     * The operation has been validated by an Application developer or
     * Operator to have completed successfully.
     */
    OK = 1,
    /**
     * The default status.
     */
    UNSET = 0
}

declare type SortOrder = 'asc' | 'desc';

/**
 * An interface that represents a span. A span represents a single operation
 * within a trace. Examples of span might include remote procedure calls or a
 * in-process function calls to sub-components. A Trace has a single, top-level
 * "root" Span that in turn may have zero or more child Spans, which in turn
 * may have children.
 *
 * Spans are created by the {@link Tracer.startSpan} method.
 */
declare interface Span {
    /**
     * Adds an event to the Span.
     *
     * @param name the name of the event.
     * @param [attributesOrStartTime] the attributes that will be added; these are
     *     associated with this event. Can be also a start time
     *     if type is {@type TimeInput} and 3rd param is undefined
     * @param [startTime] start time of the event.
     */
    addEvent(name: string, attributesOrStartTime?: SpanAttributes | TimeInput, startTime?: TimeInput): this;
    /**
     * Adds a single link to the span.
     *
     * Links added after the creation will not affect the sampling decision.
     * It is preferred span links be added at span creation.
     *
     * @param link the link to add.
     */
    addLink(link: Link): this;
    /**
     * Adds multiple links to the span.
     *
     * Links added after the creation will not affect the sampling decision.
     * It is preferred span links be added at span creation.
     *
     * @param links the links to add.
     */
    addLinks(links: Link[]): this;
    /**
     * Marks the end of Span execution.
     *
     * Call to End of a Span MUST not have any effects on child spans. Those may
     * still be running and can be ended later.
     *
     * Do not return `this`. The Span generally should not be used after it
     * is ended so chaining is not desired in this context.
     *
     * @param [endTime] the time to set as Span's end time. If not provided,
     *     use the current time as the span's end time.
     */
    end(endTime?: TimeInput): void;
    /**
     * Returns the flag whether this span will be recorded.
     *
     * @returns true if this Span is active and recording information like events
     *     with the `AddEvent` operation and attributes using `setAttributes`.
     */
    isRecording(): boolean;
    /**
     * Sets exception as a span event
     * @param exception the exception the only accepted values are string or Error
     * @param [time] the time to set as Span's event time. If not provided,
     *     use the current time.
     */
    recordException(exception: Exception, time?: TimeInput): void;
    /**
     * Sets an attribute to the span.
     *
     * Sets a single Attribute with the key and value passed as arguments.
     *
     * @param key the key for this attribute.
     * @param value the value for this attribute. Setting a value null or
     *              undefined is invalid and will result in undefined behavior.
     */
    setAttribute(key: string, value: SpanAttributeValue): this;
    /**
     * Sets attributes to the span.
     *
     * @param attributes the attributes that will be added.
     *                   null or undefined attribute values
     *                   are invalid and will result in undefined behavior.
     */
    setAttributes(attributes: SpanAttributes): this;
    /**
     * Sets a status to the span. If used, this will override the default Span
     * status. Default is {@link SpanStatusCode.UNSET}. SetStatus overrides the value
     * of previous calls to SetStatus on the Span.
     *
     * @param status the SpanStatus to set.
     */
    setStatus(status: SpanStatus): this;
    /**
     * Returns the {@link SpanContext} object associated with this Span.
     *
     * Get an immutable, serializable identifier for this span that can be used
     * to create new child spans. Returned SpanContext is usable even after the
     * span ends.
     *
     * @returns the SpanContext object associated with this Span.
     */
    spanContext(): SpanContext;
    /**
     * Updates the Span name.
     *
     * This will override the name provided via {@link Tracer.startSpan}.
     *
     * Upon this update, any sampling behavior based on Span name will depend on
     * the implementation.
     *
     * @param name the Span name.
     */
    updateName(name: string): this;
}

/**
 * @deprecated please use {@link Attributes}
 */
declare type SpanAttributes = Attributes;

/**
 * @deprecated please use {@link AttributeValue}
 */
declare type SpanAttributeValue = AttributeValue;

declare type SpanCallback<R> = (span?: Span, context?: Context) => R;

/**
 * A SpanContext represents the portion of a {@link Span} which must be
 * serialized and propagated along side of a {@link Baggage}.
 */
declare interface SpanContext {
    /**
     * Only true if the SpanContext was propagated from a remote parent.
     */
    isRemote?: boolean;
    /**
     * The ID of the Span. It is globally unique with practically sufficient
     * probability by being made as 8 randomly generated bytes, encoded as a 16
     * lowercase hex characters corresponding to 64 bits.
     */
    spanId: string;
    /**
     * Trace flags to propagate.
     *
     * It is represented as 1 byte (bitmap). Bit to represent whether trace is
     * sampled or not. When set, the least significant bit documents that the
     * caller may have recorded trace data. A caller who does not record trace
     * data out-of-band leaves this flag unset.
     *
     * see {@link TraceFlags} for valid flag values.
     */
    traceFlags: number;
    /**
     * The ID of the trace that this span belongs to. It is worldwide unique
     * with practically sufficient probability by being made as 16 randomly
     * generated bytes, encoded as a 32 lowercase hex characters corresponding to
     * 128 bits.
     */
    traceId: string;
    /**
     * Tracing-system-specific info to propagate.
     *
     * The tracestate field value is a `list` as defined below. The `list` is a
     * series of `list-members` separated by commas `,`, and a list-member is a
     * key/value pair separated by an equals sign `=`. Spaces and horizontal tabs
     * surrounding `list-members` are ignored. There can be a maximum of 32
     * `list-members` in a `list`.
     * More Info: https://www.w3.org/TR/trace-context/#tracestate-field
     *
     * Examples:
     *     Single tracing system (generic format):
     *         tracestate: rojo=00f067aa0ba902b7
     *     Multiple tracing systems (with different formatting):
     *         tracestate: rojo=00f067aa0ba902b7,congo=t61rcWkgMzE
     */
    traceState?: TraceState;
}

/**
 * Options needed for span creation
 */
declare interface SpanOptions {
    /** A span's attributes */
    attributes?: SpanAttributes;
    /**
     * The SpanKind of a span
     * @default {@link SpanKind.INTERNAL}
     */
    kind?: SpanKind;
    /** {@link Link}s span to other spans */
    links?: Link[];
    /** The new span should be a root span. (Ignore parent from context). */
    root?: boolean;
    /** A manually specified start time for the created `Span` object. */
    startTime?: TimeInput;
}

declare interface SpanStatus {
    /** The status code of this message. */
    code: SpanStatusCode;
    /** A developer-facing error message. */
    message?: string;
}

declare interface SqlDriverAdapter extends SqlQueryable {
    /**
     * Dispose of the connection and release any resources.
     */
    dispose(): Promise<void>;
    /**
     * Execute multiple SQL statements separated by semicolon.
     */
    executeScript(script: string): Promise<void>;
    /**
     * Optional method that returns extra connection info
     */
    getConnectionInfo?(): ConnectionInfo;
    /**
     * Start new transaction.
     */
    startTransaction(isolationLevel?: IsolationLevel): Promise<Transaction>;
}

export declare interface SqlDriverAdapterFactory extends DriverAdapterFactory<SqlQuery, SqlResultSet> {
    connect(): Promise<SqlDriverAdapter>;
}

declare type SqlQuery = {
    args: Array<unknown>;
    argTypes: Array<ArgType>;
    sql: string;
};

declare interface SqlQueryable extends Queryable<SqlQuery, SqlResultSet> {
}

declare interface SqlResultSet {
    /**
     * List of column names appearing in a database query, in the same order as `columnTypes`.
     */
    columnNames: Array<string>;
    /**
     * List of column types appearing in a database query, in the same order as `columnNames`.
     * They are used within the Query Engine to convert values from JS to Quaint values.
     */
    columnTypes: Array<ColumnType>;
    /**
     * The last ID of an `INSERT` statement, if any.
     * This is required for `AUTO_INCREMENT` columns in databases based on MySQL and SQLite.
     */
    lastInsertId?: string;
    /**
     * List of rows retrieved from a database query.
     * Each row is a list of values, whose length matches `columnNames` and `columnTypes`.
     */
    rows: Array<Array<unknown>>;
}

/**
 * Defines TimeInput.
 *
 * hrtime, epoch milliseconds, performance.now() or Date
 */
declare type TimeInput = Date | HrTime_2 | number;

export declare type ToTuple<T> = T extends any[] ? T : [T];

declare interface TraceState {
    /**
     * Returns the value to which the specified key is mapped, or `undefined` if
     * this map contains no mapping for the key.
     *
     * @param key with which the specified value is to be associated.
     * @returns the value to which the specified key is mapped, or `undefined` if
     *     this map contains no mapping for the key.
     */
    get(key: string): string | undefined;
    /**
     * Serializes the TraceState to a `list` as defined below. The `list` is a
     * series of `list-members` separated by commas `,`, and a list-member is a
     * key/value pair separated by an equals sign `=`. Spaces and horizontal tabs
     * surrounding `list-members` are ignored. There can be a maximum of 32
     * `list-members` in a `list`.
     *
     * @returns the serialized string.
     */
    serialize(): string;
    /**
     * Create a new TraceState which inherits from this TraceState and has the
     * given key set.
     * The new entry will always be added in the front of the list of states.
     *
     * @param key key of the TraceState entry.
     * @param value value of the TraceState entry.
     */
    set(key: string, value: string): TraceState;
    /**
     * Return a new TraceState which inherits from this TraceState but does not
     * contain the given key.
     *
     * @param key the key for the TraceState entry to be removed.
     */
    unset(key: string): TraceState;
}

declare interface TracingHelper {
    dispatchEngineSpans(spans: EngineSpan[]): void;
    getActiveContext(): Context | undefined;
    getTraceParent(context?: Context): string;
    isEnabled(): boolean;
    runInChildSpan<R>(nameOrOptions: ExtendedSpanOptions | string, callback: SpanCallback<R>): R;
}

declare interface Transaction extends AdapterInfo, SqlQueryable {
    /**
     * Commit the transaction.
     */
    commit(): Promise<void>;
    /**
     * Transaction options.
     */
    readonly options: TransactionOptions;
    /**
     * Roll back the transaction.
     */
    rollback(): Promise<void>;
}

/**
 * A SQL instance can be nested within each other to build SQL strings.
 */
export declare class Sql {
    readonly strings: string[];
    readonly values: Value[];
    get sql(): string;
    get statement(): string;
    get text(): string;
    constructor(rawStrings: readonly string[], rawValues: readonly RawValue[]);
    inspect(): {
        sql: string;
        statement: string;
        text: string;
        values: unknown[];
    };
}

/**
 * Create a SQL object from a template string.
 */
export declare function sqltag(strings: readonly string[], ...values: readonly RawValue[]): Sql;

declare namespace Transaction_2 {
    export {
        InteractiveTransactionInfo,
        IsolationLevel_2 as IsolationLevel,
        Options,
        TransactionHeaders
    }
}

declare type TransactionHeaders = {
    traceparent?: string;
};

declare type TransactionOptions = {
    usePhantomQuery: boolean;
};

declare type TransactionOptions_2<InteractiveTransactionPayload> = {
    kind: 'batch';
    options: BatchTransactionOptions;
} | {
    kind: 'itx';
    options: InteractiveTransactionOptions<InteractiveTransactionPayload>;
};

export declare type TypeMapCbDef = Fn<{
    extArgs: InternalArgs;
}, TypeMapDef>;

/** Shared */
export declare type TypeMapDef = Record<any, any>;

declare type TypeRef<AllowedLocations extends FieldLocation> = {
    isList: boolean;
    location: AllowedLocations;
    namespace?: FieldNamespace;
    type: string;
};

export declare class TypedSql<Values extends readonly unknown[], Result> {
    [PrivateResultType]: Result;
    get sql(): string;
    get values(): Values;
    constructor(sql: string, values: Values);
}

declare namespace Types {
    export {
        Extensions_2 as Extensions,
        isSkip,
        OperationPayload as Payload,
        Public_2 as Public,
        Result_3 as Result,
        Skip,
        skip,
        UnknownTypedSql,
        Utils
    }
}
export { Types }

declare type uniqueIndex = ReadonlyDeep_2<{
    fields: string[];
    name: string;
}>;

declare type UnknownErrorParams = {
    batchRequestIdx?: number;
    clientVersion: string;
};

export declare type UnknownTypedSql = TypedSql<unknown[], unknown>;

declare type Unpacker = (data: any) => any;

export declare type UnwrapPayload<P> = {} extends P ? unknown : {
    [K in keyof P]: P[K] extends {
        composites: infer C;
        scalars: infer S;
    }[] ? Array<S & UnwrapPayload<C>> : P[K] extends {
        composites: infer C;
        scalars: infer S;
    } | null ? S & UnwrapPayload<C> | Select<P[K], null> : never;
};

export declare type UnwrapPromise<P> = P extends Promise<infer R> ? R : P;

export declare type UnwrapTuple<Tuple extends readonly unknown[]> = {
    [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>;
};

/**
 * Input that flows from the user into the Client.
 */
declare type UserArgs_2 = any;

declare namespace Utils {
    export {
        Call,
        Cast,
        Compute,
        ComputeDeep,
        EmptyToUnknown,
        Equals,
        Exact,
        Fn,
        JsPromise,
        Narrow,
        Narrowable,
        NeverToUnknown,
        Omit_2 as Omit,
        Optional,
        OptionalFlat,
        OptionalKeys,
        Or,
        PatchFlat,
        Path,
        PayloadToResult,
        Pick_2 as Pick,
        ReadonlyDeep,
        Record_2 as Record,
        RenameAndNestPayloadKeys,
        RequiredKeys,
        Return,
        Select,
        ToTuple,
        UnwrapPromise,
        UnwrapTuple
    }
}

/**
 * Values supported by SQL engine.
 */
export declare type Value = unknown;

declare function validator<V>(): <S>(select: Exact<S, V>) => S;

declare function validator<C, M extends Exclude<keyof C, `$${string}`>, O extends keyof C[M] & Operation>(client: C, model: M, operation: O): <S>(select: Exact<S, Args<C[M], O>>) => S;

declare function validator<C, M extends Exclude<keyof C, `$${string}`>, O extends keyof C[M] & Operation, P extends keyof Args<C[M], O>>(client: C, model: M, operation: O, prop: P): <S>(select: Exact<S, Args<C[M], O>[P]>) => S;

export declare function warnEnvConflicts(envPaths: any): void;

export declare const warnOnce: (key: string, message: string, ...args: unknown[]) => void;

export { }
