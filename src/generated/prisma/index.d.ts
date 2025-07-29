
/**
 * Client
**/

import * as runtime from './runtime/library.js';

import $Types = runtime.Types // general types
import $Extensions = runtime.Types.Extensions
import $Public = runtime.Types.Public
import $Result = runtime.Types.Result
import $Utils = runtime.Types.Utils

/**
 * Model Answer
 * 
 */
export type Answer = $Result.DefaultSelection<Prisma.$AnswerPayload>


/**
 * Model MatrixRow
 * 
 */
export type MatrixRow = $Result.DefaultSelection<Prisma.$MatrixRowPayload>
/**
 * Model Option
 * 
 */
export type Option = $Result.DefaultSelection<Prisma.$OptionPayload>
export type PrismaPromise<T> = $Public.PrismaPromise<T>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Response
 * 
 */
export type Response = $Result.DefaultSelection<Prisma.$ResponsePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const QuestionType: {
  MATRIX: 'MATRIX'
  RADIO: 'RADIO',
  TEXT: 'TEXT',
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]

}

export type QuestionType = $Enums.QuestionType

export const QuestionType: typeof $Enums.QuestionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogDefinition | Prisma.LogLevel> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>
  /**
   * `prisma.answer`: Exposes CRUD operations for the **Answer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Answers
    * const answers = await prisma.answer.findMany()
    * ```
    */
  get answer(): Prisma.AnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matrixRow`: Exposes CRUD operations for the **MatrixRow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatrixRows
    * const matrixRows = await prisma.matrixRow.findMany()
    * ```
    */
  get matrixRow(): Prisma.MatrixRowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.option`: Exposes CRUD operations for the **Option** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Options
    * const options = await prisma.option.findMany()
    * ```
    */
  get option(): Prisma.OptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

/**
   * `prisma.response`: Exposes CRUD operations for the **Response** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Responses
    * const responses = await prisma.response.findMany()
    * ```
    */
  get response(): Prisma.ResponseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;


  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: Prisma.Sql | TemplateStringsArray, ...values: any[]): Prisma.PrismaPromise<number>;


  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

      $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: Prisma.Sql | TemplateStringsArray, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>
  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { isolationLevel?: Prisma.TransactionIsolationLevel; maxWait?: number, timeout?: number, }): $Utils.JsPromise<R>

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type Metric<T> = runtime.Metric<T>

  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket
  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      0: AtLoose<O, K>;
      1: AtStrict<O, K>;
  }[strict];

  /**
  A [[Boolean]]
  */
  export type Boolean = False | True

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type Enumerable<T> = Array<T> | T;

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0


  /**
  0
  */
  export type False = 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};


  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>


  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  // /**
  // 1
  // */
  export type True = 1

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | null | undefined ? never : K]: K
  }

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  export type Union = any

  type __Either<O extends object, K extends Key> = {
      // Merge all but K
      [P in K]: Prisma__Pick<O, keyof O & P> // With K possibilities
    }[K] &
    Omit<O, K>
  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    0: EitherLoose<O, K>
    1: EitherStrict<O, K>
  }[strict]
  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;
  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };
  type _Strict<U, _U = U> = U extends unknown ? OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> & U : never;

  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
      | (K extends keyof O ? { [P in K]: O[P] } & O : O)
    : never>;

  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;

  type AtStrict<O extends object, K extends Key> = O[K & keyof O];

  type Cast<A, B> = A extends B ? A : B;

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>
  /** End Helper Types for "Merge" **/

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends bigint
  ? False
  : T extends object
  ? True
  : False

  type Key = number | string | symbol;

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };

  type SelectAndInclude = {
    include: any
    select: any
  }

  type SelectAndOmit = {
    omit: any
    select: any
  }

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (T & Without<U, T>) | (U & Without<T, U>)
    : U : T

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T
  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_count' | '_max' | '_min' | '_sum'>
  > = IsObject<T> extends True ? U : T
  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T


  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>


  export const ModelName: {
    Answer: 'Answer'
    MatrixRow: 'MatrixRow',
    Option: 'Option',
    Question: 'Question',
    Response: 'Response',
    User: 'User',
  };

  export type Datasources = {
    db?: Datasource
  }


  export type ModelName = (typeof ModelName)[keyof typeof ModelName]

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "answer" | "matrixRow" | "option" | "question" | "response" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Answer: {
        fields: Prisma.AnswerFieldRefs
        operations: {
          aggregate: {
            args: Prisma.AnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnswer>
          }
          count: {
            args: Prisma.AnswerCountArgs<ExtArgs>
            result: $Utils.Optional<AnswerCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.AnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          createMany: {
            args: Prisma.AnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          delete: {
            args: Prisma.AnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          deleteMany: {
            args: Prisma.AnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.AnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          findMany: {
            args: Prisma.AnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          findUnique: {
            args: Prisma.AnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          groupBy: {
            args: Prisma.AnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnswerGroupByOutputType>[]
          }
          update: {
            args: Prisma.AnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          updateMany: {
            args: Prisma.AnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          upsert: {
            args: Prisma.AnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
        }
        payload: Prisma.$AnswerPayload<ExtArgs>
      }
      MatrixRow: {
        fields: Prisma.MatrixRowFieldRefs
        operations: {
          aggregate: {
            args: Prisma.MatrixRowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatrixRow>
          }
          count: {
            args: Prisma.MatrixRowCountArgs<ExtArgs>
            result: $Utils.Optional<MatrixRowCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.MatrixRowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>
          }
          createMany: {
            args: Prisma.MatrixRowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatrixRowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>[]
          }
          delete: {
            args: Prisma.MatrixRowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>
          }
          deleteMany: {
            args: Prisma.MatrixRowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.MatrixRowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatrixRowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>
          }
          findMany: {
            args: Prisma.MatrixRowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>[]
          }
          findUnique: {
            args: Prisma.MatrixRowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatrixRowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>
          }
          groupBy: {
            args: Prisma.MatrixRowGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatrixRowGroupByOutputType>[]
          }
          update: {
            args: Prisma.MatrixRowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>
          }
          updateMany: {
            args: Prisma.MatrixRowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatrixRowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>[]
          }
          upsert: {
            args: Prisma.MatrixRowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatrixRowPayload>
          }
        }
        payload: Prisma.$MatrixRowPayload<ExtArgs>
      }
      Option: {
        fields: Prisma.OptionFieldRefs
        operations: {
          aggregate: {
            args: Prisma.OptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOption>
          }
          count: {
            args: Prisma.OptionCountArgs<ExtArgs>
            result: $Utils.Optional<OptionCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.OptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          createMany: {
            args: Prisma.OptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>[]
          }
          delete: {
            args: Prisma.OptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          deleteMany: {
            args: Prisma.OptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.OptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          findMany: {
            args: Prisma.OptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>[]
          }
          findUnique: {
            args: Prisma.OptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          groupBy: {
            args: Prisma.OptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<OptionGroupByOutputType>[]
          }
          update: {
            args: Prisma.OptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          updateMany: {
            args: Prisma.OptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>[]
          }
          upsert: {
            args: Prisma.OptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
        }
        payload: Prisma.$OptionPayload<ExtArgs>
      }
      Question: {
        fields: Prisma.QuestionFieldRefs
        operations: {
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
        }
        payload: Prisma.$QuestionPayload<ExtArgs>
      }
      Response: {
        fields: Prisma.ResponseFieldRefs
        operations: {
          aggregate: {
            args: Prisma.ResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResponse>
          }
          count: {
            args: Prisma.ResponseCountArgs<ExtArgs>
            result: $Utils.Optional<ResponseCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.ResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          createMany: {
            args: Prisma.ResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          delete: {
            args: Prisma.ResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          deleteMany: {
            args: Prisma.ResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.ResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findMany: {
            args: Prisma.ResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          findUnique: {
            args: Prisma.ResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          groupBy: {
            args: Prisma.ResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResponseGroupByOutputType>[]
          }
          update: {
            args: Prisma.ResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          updateMany: {
            args: Prisma.ResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResponseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          upsert: {
            args: Prisma.ResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
        }
        payload: Prisma.$ResponsePayload<ExtArgs>
      }
      User: {
        fields: Prisma.UserFieldRefs
        operations: {
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
        }
        payload: Prisma.$UserPayload<ExtArgs>
      }
    }
  } & {
    other: {
      operations: {
        $executeRaw: {
          args: [query: Prisma.Sql | TemplateStringsArray, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: Prisma.Sql | TemplateStringsArray, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
      payload: any
    }
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type $AnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "Answer"
    objects: {
      question: Prisma.$QuestionPayload<ExtArgs>
      response: Prisma.$ResponsePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      questionId: string
      responseId: number
      value: Prisma.JsonValue
    }, ExtArgs["result"]["answer"]>
  }
  export type $MatrixRowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "MatrixRow"
    objects: {
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      label: string
      order: number
      questionId: string
    }, ExtArgs["result"]["matrixRow"]>
  }
  export type $OptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "Option"
    objects: {
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      order: number
      questionId: string
      value: string
    }, ExtArgs["result"]["option"]>
  }
  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "Question"
    objects: {
      /**
       * all answers given against this question
       */
      answers: Prisma.$AnswerPayload<ExtArgs>[]
      matrixRows: Prisma.$MatrixRowPayload<ExtArgs>[]
      options: Prisma.$OptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      createdAt: Date
      id: string
      step: number
      text: string
      type: $Enums.QuestionType
      updatedAt: Date
    }, ExtArgs["result"]["question"]>
  }

  export type $ResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "Response"
    objects: {
      answers: Prisma.$AnswerPayload<ExtArgs>[]
      user: null | Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      submittedAt: Date
      userId: null | number
    }, ExtArgs["result"]["response"]>
  }
  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    composites: {}
    name: "User"
    objects: {
      responses: Prisma.$ResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      createdAt: Date
      email: string
      id: number
      passwordHash: string
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
  }

  export type AggregateAnswer = {
    _avg: AnswerAvgAggregateOutputType | null
    _count: AnswerCountAggregateOutputType | null
    _max: AnswerMaxAggregateOutputType | null
    _min: AnswerMinAggregateOutputType | null
    _sum: AnswerSumAggregateOutputType | null
  }
  export type AggregateMatrixRow = {
    _avg: MatrixRowAvgAggregateOutputType | null
    _count: MatrixRowCountAggregateOutputType | null
    _max: MatrixRowMaxAggregateOutputType | null
    _min: MatrixRowMinAggregateOutputType | null
    _sum: MatrixRowSumAggregateOutputType | null
  }

  export type AggregateOption = {
    _avg: null | OptionAvgAggregateOutputType
    _count: null | OptionCountAggregateOutputType
    _max: null | OptionMaxAggregateOutputType
    _min: null | OptionMinAggregateOutputType
    _sum: null | OptionSumAggregateOutputType
  }

  export type AggregateQuestion = {
    _avg: null | QuestionAvgAggregateOutputType
    _count: null | QuestionCountAggregateOutputType
    _max: null | QuestionMaxAggregateOutputType
    _min: null | QuestionMinAggregateOutputType
    _sum: null | QuestionSumAggregateOutputType
  }
  /* End Types for Logging */


  export type AggregateResponse = {
    _avg: null | ResponseAvgAggregateOutputType
    _count: null | ResponseCountAggregateOutputType
    _max: null | ResponseMaxAggregateOutputType
    _min: null | ResponseMinAggregateOutputType
    _sum: null | ResponseSumAggregateOutputType
  }

  export type AggregateUser = {
    _avg: null | UserAvgAggregateOutputType
    _count: null | UserCountAggregateOutputType
    _max: null | UserMaxAggregateOutputType
    _min: null | UserMinAggregateOutputType
    _sum: null | UserSumAggregateOutputType
  }

  export type AnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Answers
    **/
    _count?: AnswerCountAggregateInputType | true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnswerMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * Filter which Answer to aggregate.
     */
    where?: AnswerWhereInput
  }

  export type AnswerAvgAggregateInputType = {
    id?: true
    responseId?: true
  }

  export type AnswerAvgAggregateOutputType = {
    id: null | number
    responseId: null | number
  }

  export type AnswerCountAggregateInputType = {
    _all?: true
    id?: true
    questionId?: true
    responseId?: true
    value?: true
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type AnswerCountAggregateOutputType = {
    _all: number
    id: number
    questionId: number
    responseId: number
    value: number
  }

  /**
   * Answer create
   */
  export type AnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a Answer.
     */
    data: XOR<AnswerCreateInput, AnswerUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
  }

  /**
   * Answer createManyAndReturn
   */
  export type AnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Answers.
     */
    data: AnswerCreateManyInput | AnswerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerIncludeCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelectCreateManyAndReturn<ExtArgs> | null
    skipDuplicates?: boolean
  }

  /**
   * Answer createMany
   */
  export type AnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Answers.
     */
    data: AnswerCreateManyInput | AnswerCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Count Type QuestionCountOutputType
   */

  /**
   * Answer without action
   */
  export type AnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
  }

  export interface AnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'Answer' }; types: Prisma.TypeMap<ExtArgs>['model']['Answer'], }
    /**
     * Allows you to perform aggregations operations on a Answer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnswerAggregateArgs>(args: Subset<T, AnswerAggregateArgs>): Prisma.PrismaPromise<GetAnswerAggregateType<T>>

    /**
     * Count the number of Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerCountArgs} args - Arguments to filter Answers to count.
     * @example
     * // Count the number of Answers
     * const count = await prisma.answer.count({
     *   where: {
     *     // ... the filter for the Answers we want to count
     *   }
     * })
    **/
    count<T extends AnswerCountArgs>(
      args?: Subset<T, AnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnswerCountAggregateOutputType>
        : number
    >

    /**
     * Create a Answer.
     * @param {AnswerCreateArgs} args - Arguments to create a Answer.
     * @example
     * // Create one Answer
     * const Answer = await prisma.answer.create({
     *   data: {
     *     // ... data to create a Answer
     *   }
     * })
     * 
     */
    create<T extends AnswerCreateArgs>(args: SelectSubset<T, AnswerCreateArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Answers.
     * @param {AnswerCreateManyArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answer = await prisma.answer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnswerCreateManyArgs>(args?: SelectSubset<T, AnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Answers and returns the data saved in the database.
     * @param {AnswerCreateManyAndReturnArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answer = await prisma.answer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Answers and only return the `id`
     * const answerWithIdOnly = await prisma.answer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, AnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Answer.
     * @param {AnswerDeleteArgs} args - Arguments to delete one Answer.
     * @example
     * // Delete one Answer
     * const Answer = await prisma.answer.delete({
     *   where: {
     *     // ... filter to delete one Answer
     *   }
     * })
     * 
     */
    delete<T extends AnswerDeleteArgs>(args: SelectSubset<T, AnswerDeleteArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Answers.
     * @param {AnswerDeleteManyArgs} args - Arguments to filter Answers to delete.
     * @example
     * // Delete a few Answers
     * const { count } = await prisma.answer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnswerDeleteManyArgs>(args?: SelectSubset<T, AnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the Answer model
   */
  readonly fields: AnswerFieldRefs;

    /**
     * Find the first Answer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindFirstArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnswerFindFirstArgs>(args?: SelectSubset<T, AnswerFindFirstArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Answer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindFirstOrThrowArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, AnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Answers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Answers
     * const answers = await prisma.answer.findMany()
     * 
     * // Get first 10 Answers
     * const answers = await prisma.answer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const answerWithIdOnly = await prisma.answer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnswerFindManyArgs>(args?: SelectSubset<T, AnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one Answer that matches the filter.
     * @param {AnswerFindUniqueArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnswerFindUniqueArgs>(args: SelectSubset<T, AnswerFindUniqueArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Answer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnswerFindUniqueOrThrowArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, AnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by Answer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnswerGroupByArgs['orderBy'] }
        : { orderBy?: AnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, AnswerGroupByArgs, OrderByArg>): {} extends InputErrors ? GetAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one Answer.
     * @param {AnswerUpdateArgs} args - Arguments to update one Answer.
     * @example
     * // Update one Answer
     * const answer = await prisma.answer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnswerUpdateArgs>(args: SelectSubset<T, AnswerUpdateArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Answers
     * const answer = await prisma.answer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnswerUpdateManyArgs>(args: SelectSubset<T, AnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Answers and returns the data updated in the database.
     * @param {AnswerUpdateManyAndReturnArgs} args - Arguments to update many Answers.
     * @example
     * // Update many Answers
     * const answer = await prisma.answer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Answers and only return the `id`
     * const answerWithIdOnly = await prisma.answer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, AnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one Answer.
     * @param {AnswerUpsertArgs} args - Arguments to update or create a Answer.
     * @example
     * // Update or create a Answer
     * const answer = await prisma.answer.upsert({
     *   create: {
     *     // ... data to create a Answer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Answer we want to update
     *   }
     * })
     */
    upsert<T extends AnswerUpsertArgs>(args: SelectSubset<T, AnswerUpsertArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * Answer delete
   */
  export type AnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Filter which Answer to delete.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer deleteMany
   */
  export type AnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many Answers to delete.
     */
    limit?: number
    /**
     * Filter which Answers to delete
     */
    where?: AnswerWhereInput
  }

  /**
   * Answer findFirst
   */
  export type AnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Answers.
     */
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Answer to fetch.
     */
    where?: AnswerWhereInput
  }

  /**
   * Answer findFirstOrThrow
   */
  export type AnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Answers.
     */
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Answer to fetch.
     */
    where?: AnswerWhereInput
  }


  /**
   * Count Type ResponseCountOutputType
   */

  /**
   * Answer findMany
   */
  export type AnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Answers.
     */
    cursor?: AnswerWhereUniqueInput
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Answers to fetch.
     */
    where?: AnswerWhereInput
  }

  // Custom InputTypes
  /**
   * Answer findUnique
   */
  export type AnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer findUniqueOrThrow
   */
  export type AnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where: AnswerWhereUniqueInput
  }

  export type AnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _avg?: AnswerAvgAggregateInputType
    _count?: AnswerCountAggregateInputType | true
    _max?: AnswerMaxAggregateInputType
    _min?: AnswerMinAggregateInputType
    _sum?: AnswerSumAggregateInputType
    by: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
    having?: AnswerScalarWhereWithAggregatesInput
    orderBy?: AnswerOrderByWithAggregationInput | AnswerOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: AnswerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AnswerGroupByOutputType = {
    _avg: AnswerAvgAggregateOutputType | null
    _count: AnswerCountAggregateOutputType | null
    _max: AnswerMaxAggregateOutputType | null
    _min: AnswerMinAggregateOutputType | null
    _sum: AnswerSumAggregateOutputType | null
    id: number
    questionId: string
    responseId: number
    value: JsonValue
  }

  export type AnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    response?: boolean | ResponseDefaultArgs<ExtArgs>
  }

  export type AnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    response?: boolean | ResponseDefaultArgs<ExtArgs>
  }

  export type AnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    response?: boolean | ResponseDefaultArgs<ExtArgs>
  }

  export type AnswerMaxAggregateInputType = {
    id?: true
    questionId?: true
    responseId?: true
  }

  export type AnswerMaxAggregateOutputType = {
    id: null | number
    questionId: null | string
    responseId: null | number
  }


  export type AnswerMinAggregateInputType = {
    id?: true
    questionId?: true
    responseId?: true
  }

  export type AnswerMinAggregateOutputType = {
    id: null | number
    questionId: null | string
    responseId: null | number
  }

  export type AnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "questionId" | "responseId" | "value", ExtArgs["result"]["answer"]>

  export type AnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
    response?: boolean | ResponseDefaultArgs<ExtArgs>
    responseId?: boolean
    value?: boolean
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
    response?: boolean | ResponseDefaultArgs<ExtArgs>
    responseId?: boolean
    value?: boolean
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectScalar = {
    id?: boolean
    questionId?: boolean
    responseId?: boolean
    value?: boolean
  }

  export type AnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
    response?: boolean | ResponseDefaultArgs<ExtArgs>
    responseId?: boolean
    value?: boolean
  }, ExtArgs["result"]["answer"]>




  export type AnswerSumAggregateInputType = {
    id?: true
    responseId?: true
  }

  export type AnswerSumAggregateOutputType = {
    id: null | number
    responseId: null | number
  }

  /**
   * Answer update
   */
  export type AnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a Answer.
     */
    data: XOR<AnswerUpdateInput, AnswerUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which Answer to update.
     */
    where: AnswerWhereUniqueInput
  }


  /**
   * Answer updateManyAndReturn
   */
  export type AnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Answers.
     */
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerIncludeUpdateManyAndReturn<ExtArgs> | null
    /**
     * Limit how many Answers to update.
     */
    limit?: number
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Filter which Answers to update
     */
    where?: AnswerWhereInput
  }

  /**
   * Answer updateMany
   */
  export type AnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Answers.
     */
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyInput>
    /**
     * Limit how many Answers to update.
     */
    limit?: number
    /**
     * Filter which Answers to update
     */
    where?: AnswerWhereInput
  }

  /**
   * Answer upsert
   */
  export type AnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the Answer found by the `where` argument doesn't exist, create a new Answer with this data.
     */
    create: XOR<AnswerCreateInput, AnswerUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * In case the Answer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnswerUpdateInput, AnswerUncheckedUpdateInput>
    /**
     * The filter to search for the Answer to update in case it exists.
     */
    where: AnswerWhereUniqueInput
  }

  export type Datasource = {
    url?: string
  }

  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'colorless' | 'minimal' | 'pretty'
  export type GetAnswerAggregateType<T extends AnswerAggregateArgs> = {
        [P in keyof AggregateAnswer & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnswer[P]>
      : GetScalarType<T[P], AggregateAnswer[P]>
  }
  export type GetEvents<T extends any> = T extends Array<LogDefinition | LogLevel> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type GetLogType<T extends LogDefinition | LogLevel> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never

  export type GetMatrixRowAggregateType<T extends MatrixRowAggregateArgs> = {
        [P in keyof AggregateMatrixRow & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatrixRow[P]>
      : GetScalarType<T[P], AggregateMatrixRow[P]>
  }

  export type GetOptionAggregateType<T extends OptionAggregateArgs> = {
        [P in keyof AggregateOption & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOption[P]>
      : GetScalarType<T[P], AggregateOption[P]>
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof AggregateQuestion & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }

  export type GetResponseAggregateType<T extends ResponseAggregateArgs> = {
        [P in keyof AggregateResponse & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResponse[P]>
      : GetScalarType<T[P], AggregateResponse[P]>
  }




  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof AggregateUser & keyof T]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }
    

  export type GlobalOmitConfig = {
    answer?: AnswerOmit
    matrixRow?: MatrixRowOmit
    option?: OptionOmit
    question?: QuestionOmit
    response?: ResponseOmit
    user?: UserOmit
  }

  export type LogDefinition = {
    emit: 'event' | 'stdout'
    level: LogLevel
  }

  export type LogEvent = {
    message: string
    target: string
    timestamp: Date
  }

  /* Types for Logging */
  export type LogLevel = 'error' | 'info' | 'query' | 'warn'

  export type MatrixRowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatrixRowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatrixRows
    **/
    _count?: MatrixRowCountAggregateInputType | true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatrixRowMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatrixRowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatrixRowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatrixRowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatrixRows to fetch.
     */
    orderBy?: MatrixRowOrderByWithRelationInput | MatrixRowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatrixRows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatrixRows from the position of the cursor.
     */
    take?: number
    /**
     * Filter which MatrixRow to aggregate.
     */
    where?: MatrixRowWhereInput
  }

  export type MatrixRowAvgAggregateInputType = {
    id?: true
    order?: true
  }

  export type MatrixRowAvgAggregateOutputType = {
    id: null | number
    order: null | number
  }

  export type MatrixRowCountAggregateInputType = {
    _all?: true
    id?: true
    label?: true
    order?: true
    questionId?: true
  }

  export type MatrixRowCountAggregateOutputType = {
    _all: number
    id: number
    label: number
    order: number
    questionId: number
  }

  /**
   * MatrixRow create
   */
  export type MatrixRowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a MatrixRow.
     */
    data: XOR<MatrixRowCreateInput, MatrixRowUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
  }

  /**
   * MatrixRow createManyAndReturn
   */
  export type MatrixRowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatrixRows.
     */
    data: MatrixRowCreateManyInput | MatrixRowCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowIncludeCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelectCreateManyAndReturn<ExtArgs> | null
    skipDuplicates?: boolean
  }

  /**
   * MatrixRow createMany
   */
  export type MatrixRowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatrixRows.
     */
    data: MatrixRowCreateManyInput | MatrixRowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatrixRow without action
   */
  export type MatrixRowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
  }

  export interface MatrixRowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'MatrixRow' }; types: Prisma.TypeMap<ExtArgs>['model']['MatrixRow'], }
    /**
     * Allows you to perform aggregations operations on a MatrixRow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatrixRowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatrixRowAggregateArgs>(args: Subset<T, MatrixRowAggregateArgs>): Prisma.PrismaPromise<GetMatrixRowAggregateType<T>>

    /**
     * Count the number of MatrixRows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatrixRowCountArgs} args - Arguments to filter MatrixRows to count.
     * @example
     * // Count the number of MatrixRows
     * const count = await prisma.matrixRow.count({
     *   where: {
     *     // ... the filter for the MatrixRows we want to count
     *   }
     * })
    **/
    count<T extends MatrixRowCountArgs>(
      args?: Subset<T, MatrixRowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatrixRowCountAggregateOutputType>
        : number
    >

    /**
     * Create a MatrixRow.
     * @param {MatrixRowCreateArgs} args - Arguments to create a MatrixRow.
     * @example
     * // Create one MatrixRow
     * const MatrixRow = await prisma.matrixRow.create({
     *   data: {
     *     // ... data to create a MatrixRow
     *   }
     * })
     * 
     */
    create<T extends MatrixRowCreateArgs>(args: SelectSubset<T, MatrixRowCreateArgs<ExtArgs>>): Prisma__MatrixRowClient<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatrixRows.
     * @param {MatrixRowCreateManyArgs} args - Arguments to create many MatrixRows.
     * @example
     * // Create many MatrixRows
     * const matrixRow = await prisma.matrixRow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatrixRowCreateManyArgs>(args?: SelectSubset<T, MatrixRowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatrixRows and returns the data saved in the database.
     * @param {MatrixRowCreateManyAndReturnArgs} args - Arguments to create many MatrixRows.
     * @example
     * // Create many MatrixRows
     * const matrixRow = await prisma.matrixRow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatrixRows and only return the `id`
     * const matrixRowWithIdOnly = await prisma.matrixRow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatrixRowCreateManyAndReturnArgs>(args?: SelectSubset<T, MatrixRowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatrixRow.
     * @param {MatrixRowDeleteArgs} args - Arguments to delete one MatrixRow.
     * @example
     * // Delete one MatrixRow
     * const MatrixRow = await prisma.matrixRow.delete({
     *   where: {
     *     // ... filter to delete one MatrixRow
     *   }
     * })
     * 
     */
    delete<T extends MatrixRowDeleteArgs>(args: SelectSubset<T, MatrixRowDeleteArgs<ExtArgs>>): Prisma__MatrixRowClient<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatrixRows.
     * @param {MatrixRowDeleteManyArgs} args - Arguments to filter MatrixRows to delete.
     * @example
     * // Delete a few MatrixRows
     * const { count } = await prisma.matrixRow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatrixRowDeleteManyArgs>(args?: SelectSubset<T, MatrixRowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the MatrixRow model
   */
  readonly fields: MatrixRowFieldRefs;

    /**
     * Find the first MatrixRow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatrixRowFindFirstArgs} args - Arguments to find a MatrixRow
     * @example
     * // Get one MatrixRow
     * const matrixRow = await prisma.matrixRow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatrixRowFindFirstArgs>(args?: SelectSubset<T, MatrixRowFindFirstArgs<ExtArgs>>): Prisma__MatrixRowClient<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatrixRow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatrixRowFindFirstOrThrowArgs} args - Arguments to find a MatrixRow
     * @example
     * // Get one MatrixRow
     * const matrixRow = await prisma.matrixRow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatrixRowFindFirstOrThrowArgs>(args?: SelectSubset<T, MatrixRowFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatrixRowClient<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatrixRows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatrixRowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatrixRows
     * const matrixRows = await prisma.matrixRow.findMany()
     * 
     * // Get first 10 MatrixRows
     * const matrixRows = await prisma.matrixRow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matrixRowWithIdOnly = await prisma.matrixRow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatrixRowFindManyArgs>(args?: SelectSubset<T, MatrixRowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one MatrixRow that matches the filter.
     * @param {MatrixRowFindUniqueArgs} args - Arguments to find a MatrixRow
     * @example
     * // Get one MatrixRow
     * const matrixRow = await prisma.matrixRow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatrixRowFindUniqueArgs>(args: SelectSubset<T, MatrixRowFindUniqueArgs<ExtArgs>>): Prisma__MatrixRowClient<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatrixRow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatrixRowFindUniqueOrThrowArgs} args - Arguments to find a MatrixRow
     * @example
     * // Get one MatrixRow
     * const matrixRow = await prisma.matrixRow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatrixRowFindUniqueOrThrowArgs>(args: SelectSubset<T, MatrixRowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatrixRowClient<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by MatrixRow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatrixRowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatrixRowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatrixRowGroupByArgs['orderBy'] }
        : { orderBy?: MatrixRowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, MatrixRowGroupByArgs, OrderByArg>): {} extends InputErrors ? GetMatrixRowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one MatrixRow.
     * @param {MatrixRowUpdateArgs} args - Arguments to update one MatrixRow.
     * @example
     * // Update one MatrixRow
     * const matrixRow = await prisma.matrixRow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatrixRowUpdateArgs>(args: SelectSubset<T, MatrixRowUpdateArgs<ExtArgs>>): Prisma__MatrixRowClient<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more MatrixRows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatrixRowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatrixRows
     * const matrixRow = await prisma.matrixRow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatrixRowUpdateManyArgs>(args: SelectSubset<T, MatrixRowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatrixRows and returns the data updated in the database.
     * @param {MatrixRowUpdateManyAndReturnArgs} args - Arguments to update many MatrixRows.
     * @example
     * // Update many MatrixRows
     * const matrixRow = await prisma.matrixRow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatrixRows and only return the `id`
     * const matrixRowWithIdOnly = await prisma.matrixRow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatrixRowUpdateManyAndReturnArgs>(args: SelectSubset<T, MatrixRowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one MatrixRow.
     * @param {MatrixRowUpsertArgs} args - Arguments to update or create a MatrixRow.
     * @example
     * // Update or create a MatrixRow
     * const matrixRow = await prisma.matrixRow.upsert({
     *   create: {
     *     // ... data to create a MatrixRow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatrixRow we want to update
     *   }
     * })
     */
    upsert<T extends MatrixRowUpsertArgs>(args: SelectSubset<T, MatrixRowUpsertArgs<ExtArgs>>): Prisma__MatrixRowClient<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * MatrixRow delete
   */
  export type MatrixRowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    /**
     * Filter which MatrixRow to delete.
     */
    where: MatrixRowWhereUniqueInput
  }

  /**
   * MatrixRow deleteMany
   */
  export type MatrixRowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many MatrixRows to delete.
     */
    limit?: number
    /**
     * Filter which MatrixRows to delete
     */
    where?: MatrixRowWhereInput
  }


  /**
   * Model Question
   */

  /**
   * MatrixRow findFirst
   */
  export type MatrixRowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatrixRows.
     */
    cursor?: MatrixRowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatrixRows.
     */
    distinct?: MatrixRowScalarFieldEnum | MatrixRowScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatrixRows to fetch.
     */
    orderBy?: MatrixRowOrderByWithRelationInput | MatrixRowOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatrixRows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatrixRows from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which MatrixRow to fetch.
     */
    where?: MatrixRowWhereInput
  }

  /**
   * MatrixRow findFirstOrThrow
   */
  export type MatrixRowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatrixRows.
     */
    cursor?: MatrixRowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatrixRows.
     */
    distinct?: MatrixRowScalarFieldEnum | MatrixRowScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatrixRows to fetch.
     */
    orderBy?: MatrixRowOrderByWithRelationInput | MatrixRowOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatrixRows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatrixRows from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which MatrixRow to fetch.
     */
    where?: MatrixRowWhereInput
  }

  /**
   * MatrixRow findMany
   */
  export type MatrixRowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatrixRows.
     */
    cursor?: MatrixRowWhereUniqueInput
    distinct?: MatrixRowScalarFieldEnum | MatrixRowScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatrixRows to fetch.
     */
    orderBy?: MatrixRowOrderByWithRelationInput | MatrixRowOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatrixRows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatrixRows from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which MatrixRows to fetch.
     */
    where?: MatrixRowWhereInput
  }

  // Custom InputTypes
  /**
   * MatrixRow findUnique
   */
  export type MatrixRowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    /**
     * Filter, which MatrixRow to fetch.
     */
    where: MatrixRowWhereUniqueInput
  }

  /**
   * MatrixRow findUniqueOrThrow
   */
  export type MatrixRowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    /**
     * Filter, which MatrixRow to fetch.
     */
    where: MatrixRowWhereUniqueInput
  }

  export type MatrixRowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _avg?: MatrixRowAvgAggregateInputType
    _count?: MatrixRowCountAggregateInputType | true
    _max?: MatrixRowMaxAggregateInputType
    _min?: MatrixRowMinAggregateInputType
    _sum?: MatrixRowSumAggregateInputType
    by: MatrixRowScalarFieldEnum | MatrixRowScalarFieldEnum[]
    having?: MatrixRowScalarWhereWithAggregatesInput
    orderBy?: MatrixRowOrderByWithAggregationInput | MatrixRowOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: MatrixRowWhereInput
  }


  export type MatrixRowGroupByOutputType = {
    _avg: MatrixRowAvgAggregateOutputType | null
    _count: MatrixRowCountAggregateOutputType | null
    _max: MatrixRowMaxAggregateOutputType | null
    _min: MatrixRowMinAggregateOutputType | null
    _sum: MatrixRowSumAggregateOutputType | null
    id: number
    label: string
    order: number
    questionId: string
  }

  export type MatrixRowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type MatrixRowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type MatrixRowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type MatrixRowMaxAggregateInputType = {
    id?: true
    label?: true
    order?: true
    questionId?: true
  }

  export type MatrixRowMaxAggregateOutputType = {
    id: null | number
    label: null | string
    order: null | number
    questionId: null | string
  }

  export type MatrixRowMinAggregateInputType = {
    id?: true
    label?: true
    order?: true
    questionId?: true
  }




  export type MatrixRowMinAggregateOutputType = {
    id: null | number
    label: null | string
    order: null | number
    questionId: null | string
  }

  export type MatrixRowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "label" | "order" | "questionId", ExtArgs["result"]["matrixRow"]>

  export type MatrixRowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    order?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
  }, ExtArgs["result"]["matrixRow"]>


  export type MatrixRowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    order?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
  }, ExtArgs["result"]["matrixRow"]>

  export type MatrixRowSelectScalar = {
    id?: boolean
    label?: boolean
    order?: boolean
    questionId?: boolean
  }

  export type MatrixRowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    order?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
  }, ExtArgs["result"]["matrixRow"]>

  export type MatrixRowSumAggregateInputType = {
    id?: true
    order?: true
  }

  export type MatrixRowSumAggregateOutputType = {
    id: null | number
    order: null | number
  }
  /**
   * MatrixRow update
   */
  export type MatrixRowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a MatrixRow.
     */
    data: XOR<MatrixRowUpdateInput, MatrixRowUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    /**
     * Choose, which MatrixRow to update.
     */
    where: MatrixRowWhereUniqueInput
  }
  /**
   * MatrixRow updateManyAndReturn
   */
  export type MatrixRowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatrixRows.
     */
    data: XOR<MatrixRowUpdateManyMutationInput, MatrixRowUncheckedUpdateManyInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowIncludeUpdateManyAndReturn<ExtArgs> | null
    /**
     * Limit how many MatrixRows to update.
     */
    limit?: number
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Filter which MatrixRows to update
     */
    where?: MatrixRowWhereInput
  }
  /**
   * MatrixRow updateMany
   */
  export type MatrixRowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatrixRows.
     */
    data: XOR<MatrixRowUpdateManyMutationInput, MatrixRowUncheckedUpdateManyInput>
    /**
     * Limit how many MatrixRows to update.
     */
    limit?: number
    /**
     * Filter which MatrixRows to update
     */
    where?: MatrixRowWhereInput
  }

  /**
   * MatrixRow upsert
   */
  export type MatrixRowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the MatrixRow found by the `where` argument doesn't exist, create a new MatrixRow with this data.
     */
    create: XOR<MatrixRowCreateInput, MatrixRowUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    /**
     * In case the MatrixRow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatrixRowUpdateInput, MatrixRowUncheckedUpdateInput>
    /**
     * The filter to search for the MatrixRow to update in case it exists.
     */
    where: MatrixRowWhereUniqueInput
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    action: PrismaAction
    args: any
    dataPath: string[]
    model?: ModelName
    runInTransaction: boolean
  }

  export type OptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Options
    **/
    _count?: OptionCountAggregateInputType | true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OptionMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Options to fetch.
     */
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Options from the position of the cursor.
     */
    take?: number
    /**
     * Filter which Option to aggregate.
     */
    where?: OptionWhereInput
  }

  export type OptionAvgAggregateInputType = {
    id?: true
    order?: true
  }




  export type OptionAvgAggregateOutputType = {
    id: null | number
    order: null | number
  }
    

  export type OptionCountAggregateInputType = {
    _all?: true
    id?: true
    order?: true
    questionId?: true
    value?: true
  }

  export type OptionCountAggregateOutputType = {
    _all: number
    id: number
    order: number
    questionId: number
    value: number
  }

  /**
   * Option create
   */
  export type OptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a Option.
     */
    data: XOR<OptionCreateInput, OptionUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
  }

  /**
   * Option createManyAndReturn
   */
  export type OptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Options.
     */
    data: OptionCreateManyInput | OptionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionIncludeCreateManyAndReturn<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelectCreateManyAndReturn<ExtArgs>
    skipDuplicates?: boolean
  }

  /**
   * Option createMany
   */
  export type OptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Options.
     */
    data: OptionCreateManyInput | OptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Option without action
   */
  export type OptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
  }

  export interface OptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'Option' }; types: Prisma.TypeMap<ExtArgs>['model']['Option'], }
    /**
     * Allows you to perform aggregations operations on a Option.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OptionAggregateArgs>(args: Subset<T, OptionAggregateArgs>): Prisma.PrismaPromise<GetOptionAggregateType<T>>

    /**
     * Count the number of Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionCountArgs} args - Arguments to filter Options to count.
     * @example
     * // Count the number of Options
     * const count = await prisma.option.count({
     *   where: {
     *     // ... the filter for the Options we want to count
     *   }
     * })
    **/
    count<T extends OptionCountArgs>(
      args?: Subset<T, OptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OptionCountAggregateOutputType>
        : number
    >

    /**
     * Create a Option.
     * @param {OptionCreateArgs} args - Arguments to create a Option.
     * @example
     * // Create one Option
     * const Option = await prisma.option.create({
     *   data: {
     *     // ... data to create a Option
     *   }
     * })
     * 
     */
    create<T extends OptionCreateArgs>(args: SelectSubset<T, OptionCreateArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Options.
     * @param {OptionCreateManyArgs} args - Arguments to create many Options.
     * @example
     * // Create many Options
     * const option = await prisma.option.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OptionCreateManyArgs>(args?: SelectSubset<T, OptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Options and returns the data saved in the database.
     * @param {OptionCreateManyAndReturnArgs} args - Arguments to create many Options.
     * @example
     * // Create many Options
     * const option = await prisma.option.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Options and only return the `id`
     * const optionWithIdOnly = await prisma.option.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OptionCreateManyAndReturnArgs>(args?: SelectSubset<T, OptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Option.
     * @param {OptionDeleteArgs} args - Arguments to delete one Option.
     * @example
     * // Delete one Option
     * const Option = await prisma.option.delete({
     *   where: {
     *     // ... filter to delete one Option
     *   }
     * })
     * 
     */
    delete<T extends OptionDeleteArgs>(args: SelectSubset<T, OptionDeleteArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Options.
     * @param {OptionDeleteManyArgs} args - Arguments to filter Options to delete.
     * @example
     * // Delete a few Options
     * const { count } = await prisma.option.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OptionDeleteManyArgs>(args?: SelectSubset<T, OptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the Option model
   */
  readonly fields: OptionFieldRefs;

    /**
     * Find the first Option that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionFindFirstArgs} args - Arguments to find a Option
     * @example
     * // Get one Option
     * const option = await prisma.option.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OptionFindFirstArgs>(args?: SelectSubset<T, OptionFindFirstArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Option that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionFindFirstOrThrowArgs} args - Arguments to find a Option
     * @example
     * // Get one Option
     * const option = await prisma.option.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OptionFindFirstOrThrowArgs>(args?: SelectSubset<T, OptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Options that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Options
     * const options = await prisma.option.findMany()
     * 
     * // Get first 10 Options
     * const options = await prisma.option.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const optionWithIdOnly = await prisma.option.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OptionFindManyArgs>(args?: SelectSubset<T, OptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one Option that matches the filter.
     * @param {OptionFindUniqueArgs} args - Arguments to find a Option
     * @example
     * // Get one Option
     * const option = await prisma.option.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OptionFindUniqueArgs>(args: SelectSubset<T, OptionFindUniqueArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Option that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OptionFindUniqueOrThrowArgs} args - Arguments to find a Option
     * @example
     * // Get one Option
     * const option = await prisma.option.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OptionFindUniqueOrThrowArgs>(args: SelectSubset<T, OptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by Option.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OptionGroupByArgs['orderBy'] }
        : { orderBy?: OptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, OptionGroupByArgs, OrderByArg>): {} extends InputErrors ? GetOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one Option.
     * @param {OptionUpdateArgs} args - Arguments to update one Option.
     * @example
     * // Update one Option
     * const option = await prisma.option.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OptionUpdateArgs>(args: SelectSubset<T, OptionUpdateArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Options
     * const option = await prisma.option.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OptionUpdateManyArgs>(args: SelectSubset<T, OptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Options and returns the data updated in the database.
     * @param {OptionUpdateManyAndReturnArgs} args - Arguments to update many Options.
     * @example
     * // Update many Options
     * const option = await prisma.option.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Options and only return the `id`
     * const optionWithIdOnly = await prisma.option.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OptionUpdateManyAndReturnArgs>(args: SelectSubset<T, OptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one Option.
     * @param {OptionUpsertArgs} args - Arguments to update or create a Option.
     * @example
     * // Update or create a Option
     * const option = await prisma.option.upsert({
     *   create: {
     *     // ... data to create a Option
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Option we want to update
     *   }
     * })
     */
    upsert<T extends OptionUpsertArgs>(args: SelectSubset<T, OptionUpsertArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * Option delete
   */
  export type OptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    /**
     * Filter which Option to delete.
     */
    where: OptionWhereUniqueInput
  }

  /**
   * Option deleteMany
   */
  export type OptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many Options to delete.
     */
    limit?: number
    /**
     * Filter which Options to delete
     */
    where?: OptionWhereInput
  }

  /**
   * Option findFirst
   */
  export type OptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Options.
     */
    cursor?: OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Options.
     */
    distinct?: OptionScalarFieldEnum | OptionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Options to fetch.
     */
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Options from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Option to fetch.
     */
    where?: OptionWhereInput
  }

  /**
   * Option findFirstOrThrow
   */
  export type OptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Options.
     */
    cursor?: OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Options.
     */
    distinct?: OptionScalarFieldEnum | OptionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Options to fetch.
     */
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Options from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Option to fetch.
     */
    where?: OptionWhereInput
  }

  /**
   * Option findMany
   */
  export type OptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Options.
     */
    cursor?: OptionWhereUniqueInput
    distinct?: OptionScalarFieldEnum | OptionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Options to fetch.
     */
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Options from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Options to fetch.
     */
    where?: OptionWhereInput
  }

  // Custom InputTypes
  /**
   * Option findUnique
   */
  export type OptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    /**
     * Filter, which Option to fetch.
     */
    where: OptionWhereUniqueInput
  }

  /**
   * Option findUniqueOrThrow
   */
  export type OptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    /**
     * Filter, which Option to fetch.
     */
    where: OptionWhereUniqueInput
  }

  export type OptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _avg?: OptionAvgAggregateInputType
    _count?: OptionCountAggregateInputType | true
    _max?: OptionMaxAggregateInputType
    _min?: OptionMinAggregateInputType
    _sum?: OptionSumAggregateInputType
    by: OptionScalarFieldEnum | OptionScalarFieldEnum[]
    having?: OptionScalarWhereWithAggregatesInput
    orderBy?: OptionOrderByWithAggregationInput | OptionOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: OptionWhereInput
  }

  export type OptionGroupByOutputType = {
    _avg: null | OptionAvgAggregateOutputType
    _count: null | OptionCountAggregateOutputType
    _max: null | OptionMaxAggregateOutputType
    _min: null | OptionMinAggregateOutputType
    _sum: null | OptionSumAggregateOutputType
    id: number
    order: number
    questionId: string
    value: string
  }

  export type OptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type OptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }


  /**
   * Model Option
   */

  export type OptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type OptionMaxAggregateInputType = {
    id?: true
    order?: true
    questionId?: true
    value?: true
  }

  export type OptionMaxAggregateOutputType = {
    id: null | number
    order: null | number
    questionId: null | string
    value: null | string
  }

  export type OptionMinAggregateInputType = {
    id?: true
    order?: true
    questionId?: true
    value?: true
  }

  export type OptionMinAggregateOutputType = {
    id: null | number
    order: null | number
    questionId: null | string
    value: null | string
  }

  export type OptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order" | "questionId" | "value", ExtArgs["result"]["option"]>


  export type OptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
    value?: boolean
  }, ExtArgs["result"]["option"]>

  export type OptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
    value?: boolean
  }, ExtArgs["result"]["option"]>

  export type OptionSelectScalar = {
    id?: boolean
    order?: boolean
    questionId?: boolean
    value?: boolean
  }

  export type OptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    questionId?: boolean
    value?: boolean
  }, ExtArgs["result"]["option"]>

  export type OptionSumAggregateInputType = {
    id?: true
    order?: true
  }

  export type OptionSumAggregateOutputType = {
    id: null | number
    order: null | number
  }

  /**
   * Option update
   */
  export type OptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a Option.
     */
    data: XOR<OptionUpdateInput, OptionUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    /**
     * Choose, which Option to update.
     */
    where: OptionWhereUniqueInput
  }




  /**
   * Option updateManyAndReturn
   */
  export type OptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Options.
     */
    data: XOR<OptionUpdateManyMutationInput, OptionUncheckedUpdateManyInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionIncludeUpdateManyAndReturn<ExtArgs>
    /**
     * Limit how many Options to update.
     */
    limit?: number
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelectUpdateManyAndReturn<ExtArgs>
    /**
     * Filter which Options to update
     */
    where?: OptionWhereInput
  }

  /**
   * Option updateMany
   */
  export type OptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Options.
     */
    data: XOR<OptionUpdateManyMutationInput, OptionUncheckedUpdateManyInput>
    /**
     * Limit how many Options to update.
     */
    limit?: number
    /**
     * Filter which Options to update
     */
    where?: OptionWhereInput
  }

  /**
   * Option upsert
   */
  export type OptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the Option found by the `where` argument doesn't exist, create a new Option with this data.
     */
    create: XOR<OptionCreateInput, OptionUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    /**
     * In case the Option was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OptionUpdateInput, OptionUncheckedUpdateInput>
    /**
     * The filter to search for the Option to update in case it exists.
     */
    where: OptionWhereUniqueInput
  }


  /**
   * The delegate class that acts as a "Promise-like" for Answer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    response<T extends ResponseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResponseDefaultArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatrixRow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatrixRowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Option.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    answers<T extends Question$answersArgs<ExtArgs> = {}>(args?: Subset<T, Question$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    matrixRows<T extends Question$matrixRowsArgs<ExtArgs> = {}>(args?: Subset<T, Question$matrixRowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatrixRowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    options<T extends Question$optionsArgs<ExtArgs> = {}>(args?: Subset<T, Question$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Response.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    answers<T extends Response$answersArgs<ExtArgs> = {}>(args?: Subset<T, Response$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
    user<T extends Response$userArgs<ExtArgs> = {}>(args?: Subset<T, Response$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
  }
  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null | undefined): $Utils.JsPromise<T>
    readonly [Symbol.toStringTag]: "PrismaPromise"
    responses<T extends User$responsesArgs<ExtArgs> = {}>(args?: Subset<T, User$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined, onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined): $Utils.JsPromise<TResult1 | TResult2>
  }
  export type PrismaAction =
    | 'aggregate'
    | 'count'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'findMany'
    | 'findRaw'
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'groupBy'
    | 'queryRaw'
    | 'runCommandRaw'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogDefinition | LogLevel)[]
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      isolationLevel?: Prisma.TransactionIsolationLevel
      maxWait?: number
      timeout?: number
    }
  }

  export type QueryEvent = {
    duration: number
    params: string
    query: string
    target: string
    timestamp: Date
  }

  /**
   * Question.answers
   */
  export type Question$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursor?: AnswerWhereUniqueInput
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    skip?: number
    take?: number
    where?: AnswerWhereInput
  }

  /**
   * Question.matrixRows
   */
  export type Question$matrixRowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursor?: MatrixRowWhereUniqueInput
    distinct?: MatrixRowScalarFieldEnum | MatrixRowScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatrixRowInclude<ExtArgs> | null
    /**
     * Omit specific fields from the MatrixRow
     */
    omit?: MatrixRowOmit<ExtArgs> | null
    orderBy?: MatrixRowOrderByWithRelationInput | MatrixRowOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the MatrixRow
     */
    select?: MatrixRowSelect<ExtArgs> | null
    skip?: number
    take?: number
    where?: MatrixRowWhereInput
  }

  /**
   * Question.options
   */
  export type Question$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursor?: OptionWhereUniqueInput
    distinct?: OptionScalarFieldEnum | OptionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | OptionInclude<ExtArgs>
    /**
     * Omit specific fields from the Option
     */
    omit?: null | OptionOmit<ExtArgs>
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Option
     */
    select?: null | OptionSelect<ExtArgs>
    skip?: number
    take?: number
    where?: OptionWhereInput
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: QuestionCountAggregateInputType | true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
  }




  export type QuestionAvgAggregateInputType = {
    step?: true
  }
    

  export type QuestionAvgAggregateOutputType = {
    step: null | number
  }

  export type QuestionCountAggregateInputType = {
    _all?: true
    createdAt?: true
    id?: true
    step?: true
    text?: true
    type?: true
    updatedAt?: true
  }

  export type QuestionCountAggregateOutputType = {
    _all: number
    createdAt: number
    id: number
    step: number
    text: number
    type: number
    updatedAt: number
  }

  export type QuestionCountOutputType = {
    answers: number
    matrixRows: number
    options: number
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerWhereInput
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountMatrixRowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatrixRowWhereInput
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OptionWhereInput
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: null | QuestionCountOutputTypeSelect<ExtArgs>
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionCountOutputTypeCountAnswersArgs
    matrixRows?: boolean | QuestionCountOutputTypeCountMatrixRowsArgs
    options?: boolean | QuestionCountOutputTypeCountOptionsArgs
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelectCreateManyAndReturn<ExtArgs>
    skipDuplicates?: boolean
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
  }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'Question' }; types: Prisma.TypeMap<ExtArgs>['model']['Question'], }
    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, QuestionGroupByArgs, OrderByArg>): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions and returns the data updated in the database.
     * @param {QuestionUpdateManyAndReturnArgs} args - Arguments to update many Questions.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }


  /**
   * Model MatrixRow
   */

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many Questions to delete.
     */
    limit?: number
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
  }

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }


  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _avg?: QuestionAvgAggregateInputType
    _count?: QuestionCountAggregateInputType | true
    _max?: QuestionMaxAggregateInputType
    _min?: QuestionMinAggregateInputType
    _sum?: QuestionSumAggregateInputType
    by: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
    having?: QuestionScalarWhereWithAggregatesInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: QuestionWhereInput
  }

  export type QuestionGroupByOutputType = {
    _avg: null | QuestionAvgAggregateOutputType
    _count: null | QuestionCountAggregateOutputType
    _max: null | QuestionMaxAggregateOutputType
    _min: null | QuestionMinAggregateOutputType
    _sum: null | QuestionSumAggregateOutputType
    createdAt: Date
    id: string
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt: Date
  }

  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
    answers?: boolean | Question$answersArgs<ExtArgs>
    matrixRows?: boolean | Question$matrixRowsArgs<ExtArgs>
    options?: boolean | Question$optionsArgs<ExtArgs>
  }

  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type QuestionMaxAggregateInputType = {
    createdAt?: true
    id?: true
    step?: true
    text?: true
    type?: true
    updatedAt?: true
  }

  export type QuestionMaxAggregateOutputType = {
    createdAt: Date | null
    id: null | string
    step: null | number
    text: null | string
    type: $Enums.QuestionType | null
    updatedAt: Date | null
  }




  export type QuestionMinAggregateInputType = {
    createdAt?: true
    id?: true
    step?: true
    text?: true
    type?: true
    updatedAt?: true
  }

  export type QuestionMinAggregateOutputType = {
    createdAt: Date | null
    id: null | string
    step: null | number
    text: null | string
    type: $Enums.QuestionType | null
    updatedAt: Date | null
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"createdAt" | "id" | "step" | "text" | "type" | "updatedAt", ExtArgs["result"]["question"]>


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
    answers?: boolean | Question$answersArgs<ExtArgs>
    createdAt?: boolean
    id?: boolean
    matrixRows?: boolean | Question$matrixRowsArgs<ExtArgs>
    options?: boolean | Question$optionsArgs<ExtArgs>
    step?: boolean
    text?: boolean
    type?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    id?: boolean
    step?: boolean
    text?: boolean
    type?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    createdAt?: boolean
    id?: boolean
    step?: boolean
    text?: boolean
    type?: boolean
    updatedAt?: boolean
  }

  export type QuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    id?: boolean
    step?: boolean
    text?: boolean
    type?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["question"]>

  export type QuestionSumAggregateInputType = {
    step?: true
  }
  export type QuestionSumAggregateOutputType = {
    step: null | number
  }
  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }
  /**
   * Question updateManyAndReturn
   */
  export type QuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Limit how many Questions to update.
     */
    limit?: number
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelectUpdateManyAndReturn<ExtArgs>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Limit how many Questions to update.
     */
    limit?: number
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | QuestionInclude<ExtArgs>
    /**
     * Omit specific fields from the Question
     */
    omit?: null | QuestionOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Question
     */
    select?: null | QuestionSelect<ExtArgs>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Response.answers
   */
  export type Response$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursor?: AnswerWhereUniqueInput
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    skip?: number
    take?: number
    where?: AnswerWhereInput
  }

  /**
   * Response.user
   */
  export type Response$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    where?: UserWhereInput
  }

  export type ResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Responses
    **/
    _count?: ResponseCountAggregateInputType | true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResponseMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * Filter which Response to aggregate.
     */
    where?: ResponseWhereInput
  }




  export type ResponseAvgAggregateInputType = {
    id?: true
    userId?: true
  }
    

  export type ResponseAvgAggregateOutputType = {
    id: null | number
    userId: null | number
  }

  export type ResponseCountAggregateInputType = {
    _all?: true
    id?: true
    submittedAt?: true
    userId?: true
  }

  export type ResponseCountAggregateOutputType = {
    _all: number
    id: number
    submittedAt: number
    userId: number
  }

  export type ResponseCountOutputType = {
    answers: number
  }

  /**
   * ResponseCountOutputType without action
   */
  export type ResponseCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerWhereInput
  }

  // Custom InputTypes
  /**
   * ResponseCountOutputType without action
   */
  export type ResponseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseCountOutputType
     */
    select?: null | ResponseCountOutputTypeSelect<ExtArgs>
  }

  export type ResponseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | ResponseCountOutputTypeCountAnswersArgs
  }

  /**
   * Response create
   */
  export type ResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a Response.
     */
    data?: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
  }

  /**
   * Response createManyAndReturn
   */
  export type ResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseIncludeCreateManyAndReturn<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelectCreateManyAndReturn<ExtArgs>
    skipDuplicates?: boolean
  }

  /**
   * Response createMany
   */
  export type ResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Response without action
   */
  export type ResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
  }

  export interface ResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'Response' }; types: Prisma.TypeMap<ExtArgs>['model']['Response'], }
    /**
     * Allows you to perform aggregations operations on a Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponseAggregateArgs>(args: Subset<T, ResponseAggregateArgs>): Prisma.PrismaPromise<GetResponseAggregateType<T>>

    /**
     * Count the number of Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseCountArgs} args - Arguments to filter Responses to count.
     * @example
     * // Count the number of Responses
     * const count = await prisma.response.count({
     *   where: {
     *     // ... the filter for the Responses we want to count
     *   }
     * })
    **/
    count<T extends ResponseCountArgs>(
      args?: Subset<T, ResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResponseCountAggregateOutputType>
        : number
    >

    /**
     * Create a Response.
     * @param {ResponseCreateArgs} args - Arguments to create a Response.
     * @example
     * // Create one Response
     * const Response = await prisma.response.create({
     *   data: {
     *     // ... data to create a Response
     *   }
     * })
     * 
     */
    create<T extends ResponseCreateArgs>(args: SelectSubset<T, ResponseCreateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Responses.
     * @param {ResponseCreateManyArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResponseCreateManyArgs>(args?: SelectSubset<T, ResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Responses and returns the data saved in the database.
     * @param {ResponseCreateManyAndReturnArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Responses and only return the `id`
     * const responseWithIdOnly = await prisma.response.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, ResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Response.
     * @param {ResponseDeleteArgs} args - Arguments to delete one Response.
     * @example
     * // Delete one Response
     * const Response = await prisma.response.delete({
     *   where: {
     *     // ... filter to delete one Response
     *   }
     * })
     * 
     */
    delete<T extends ResponseDeleteArgs>(args: SelectSubset<T, ResponseDeleteArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Responses.
     * @param {ResponseDeleteManyArgs} args - Arguments to filter Responses to delete.
     * @example
     * // Delete a few Responses
     * const { count } = await prisma.response.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResponseDeleteManyArgs>(args?: SelectSubset<T, ResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the Response model
   */
  readonly fields: ResponseFieldRefs;

    /**
     * Find the first Response that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResponseFindFirstArgs>(args?: SelectSubset<T, ResponseFindFirstArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, ResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Responses
     * const responses = await prisma.response.findMany()
     * 
     * // Get first 10 Responses
     * const responses = await prisma.response.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const responseWithIdOnly = await prisma.response.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResponseFindManyArgs>(args?: SelectSubset<T, ResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one Response that matches the filter.
     * @param {ResponseFindUniqueArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResponseFindUniqueArgs>(args: SelectSubset<T, ResponseFindUniqueArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Response that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResponseFindUniqueOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, ResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResponseGroupByArgs['orderBy'] }
        : { orderBy?: ResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, ResponseGroupByArgs, OrderByArg>): {} extends InputErrors ? GetResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one Response.
     * @param {ResponseUpdateArgs} args - Arguments to update one Response.
     * @example
     * // Update one Response
     * const response = await prisma.response.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResponseUpdateArgs>(args: SelectSubset<T, ResponseUpdateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResponseUpdateManyArgs>(args: SelectSubset<T, ResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses and returns the data updated in the database.
     * @param {ResponseUpdateManyAndReturnArgs} args - Arguments to update many Responses.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Responses and only return the `id`
     * const responseWithIdOnly = await prisma.response.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResponseUpdateManyAndReturnArgs>(args: SelectSubset<T, ResponseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one Response.
     * @param {ResponseUpsertArgs} args - Arguments to update or create a Response.
     * @example
     * // Update or create a Response
     * const response = await prisma.response.upsert({
     *   create: {
     *     // ... data to create a Response
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Response we want to update
     *   }
     * })
     */
    upsert<T extends ResponseUpsertArgs>(args: SelectSubset<T, ResponseUpsertArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * Response delete
   */
  export type ResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    /**
     * Filter which Response to delete.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response deleteMany
   */
  export type ResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many Responses to delete.
     */
    limit?: number
    /**
     * Filter which Responses to delete
     */
    where?: ResponseWhereInput
  }

  /**
   * Response findFirst
   */
  export type ResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
  }


  /**
   * Model Response
   */

  /**
   * Response findFirstOrThrow
   */
  export type ResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
  }

  /**
   * Response findMany
   */
  export type ResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Responses.
     */
    cursor?: ResponseWhereUniqueInput
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Responses to fetch.
     */
    where?: ResponseWhereInput
  }

  // Custom InputTypes
  /**
   * Response findUnique
   */
  export type ResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findUniqueOrThrow
   */
  export type ResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  export type ResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _avg?: ResponseAvgAggregateInputType
    _count?: ResponseCountAggregateInputType | true
    _max?: ResponseMaxAggregateInputType
    _min?: ResponseMinAggregateInputType
    _sum?: ResponseSumAggregateInputType
    by: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
    having?: ResponseScalarWhereWithAggregatesInput
    orderBy?: ResponseOrderByWithAggregationInput | ResponseOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: ResponseWhereInput
  }

  export type ResponseGroupByOutputType = {
    _avg: null | ResponseAvgAggregateOutputType
    _count: null | ResponseCountAggregateOutputType
    _max: null | ResponseMaxAggregateOutputType
    _min: null | ResponseMinAggregateOutputType
    _sum: null | ResponseSumAggregateOutputType
    id: number
    submittedAt: Date
    userId: null | number
  }


  export type ResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _count?: boolean | ResponseCountOutputTypeDefaultArgs<ExtArgs>
    answers?: boolean | Response$answersArgs<ExtArgs>
    user?: boolean | Response$userArgs<ExtArgs>
  }

  export type ResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Response$userArgs<ExtArgs>
  }

  export type ResponseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Response$userArgs<ExtArgs>
  }

  export type ResponseMaxAggregateInputType = {
    id?: true
    submittedAt?: true
    userId?: true
  }

  export type ResponseMaxAggregateOutputType = {
    id: null | number
    submittedAt: Date | null
    userId: null | number
  }

  export type ResponseMinAggregateInputType = {
    id?: true
    submittedAt?: true
    userId?: true
  }

  export type ResponseMinAggregateOutputType = {
    id: null | number
    submittedAt: Date | null
    userId: null | number
  }




  export type ResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "submittedAt" | "userId", ExtArgs["result"]["response"]>

  export type ResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    _count?: boolean | ResponseCountOutputTypeDefaultArgs<ExtArgs>
    answers?: boolean | Response$answersArgs<ExtArgs>
    id?: boolean
    submittedAt?: boolean
    user?: boolean | Response$userArgs<ExtArgs>
    userId?: boolean
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submittedAt?: boolean
    user?: boolean | Response$userArgs<ExtArgs>
    userId?: boolean
  }, ExtArgs["result"]["response"]>


  export type ResponseSelectScalar = {
    id?: boolean
    submittedAt?: boolean
    userId?: boolean
  }

  export type ResponseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submittedAt?: boolean
    user?: boolean | Response$userArgs<ExtArgs>
    userId?: boolean
  }, ExtArgs["result"]["response"]>

  export type ResponseSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResponseSumAggregateOutputType = {
    id: null | number
    userId: null | number
  }

  /**
   * Response update
   */
  export type ResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a Response.
     */
    data: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    /**
     * Choose, which Response to update.
     */
    where: ResponseWhereUniqueInput
  }
  /**
   * Response updateManyAndReturn
   */
  export type ResponseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseIncludeUpdateManyAndReturn<ExtArgs>
    /**
     * Limit how many Responses to update.
     */
    limit?: number
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelectUpdateManyAndReturn<ExtArgs>
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
  }
  /**
   * Response updateMany
   */
  export type ResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Limit how many Responses to update.
     */
    limit?: number
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
  }
  /**
   * Response upsert
   */
  export type ResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the Response found by the `where` argument doesn't exist, create a new Response with this data.
     */
    create: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    /**
     * In case the Response was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
    /**
     * The filter to search for the Response to update in case it exists.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  /**
   * User.responses
   */
  export type User$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursor?: ResponseWhereUniqueInput
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | ResponseInclude<ExtArgs>
    /**
     * Omit specific fields from the Response
     */
    omit?: null | ResponseOmit<ExtArgs>
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the Response
     */
    select?: null | ResponseSelect<ExtArgs>
    skip?: number
    take?: number
    where?: ResponseWhereInput
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
  }

  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserAvgAggregateOutputType = {
    id: null | number
  }




  export type UserCountAggregateInputType = {
    _all?: true
    createdAt?: true
    email?: true
    id?: true
    passwordHash?: true
    updatedAt?: true
  }
    

  export type UserCountAggregateOutputType = {
    _all: number
    createdAt: number
    email: number
    id: number
    passwordHash: number
    updatedAt: number
  }

  export type UserCountOutputType = {
    responses: number
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: null | UserCountOutputTypeSelect<ExtArgs>
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | UserCountOutputTypeCountResponsesArgs
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelectCreateManyAndReturn<ExtArgs>
    skipDuplicates?: boolean
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
  }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { meta: { name: 'User' }; types: Prisma.TypeMap<ExtArgs>['model']['User'], }
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: InputErrors & SubsetIntersection<T, UserGroupByArgs, OrderByArg>): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>


    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>
  /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Limit how many Users to delete.
     */
    limit?: number
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * Model Answer
   */

  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _avg?: UserAvgAggregateInputType
    _count?: true | UserCountAggregateInputType
    _max?: UserMaxAggregateInputType
    _min?: UserMinAggregateInputType
    _sum?: UserSumAggregateInputType
    by: UserScalarFieldEnum | UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    skip?: number
    take?: number
    where?: UserWhereInput
  }

  export type UserGroupByOutputType = {
    _avg: null | UserAvgAggregateOutputType
    _count: null | UserCountAggregateOutputType
    _max: null | UserMaxAggregateOutputType
    _min: null | UserMinAggregateOutputType
    _sum: null | UserSumAggregateOutputType
    createdAt: Date
    email: string
    id: number
    passwordHash: string
    updatedAt: Date
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
    responses?: boolean | User$responsesArgs<ExtArgs>
  }

  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type UserMaxAggregateInputType = {
    createdAt?: true
    email?: true
    id?: true
    passwordHash?: true
    updatedAt?: true
  }


  export type UserMaxAggregateOutputType = {
    createdAt: Date | null
    email: null | string
    id: null | number
    passwordHash: null | string
    updatedAt: Date | null
  }

  export type UserMinAggregateInputType = {
    createdAt?: true
    email?: true
    id?: true
    passwordHash?: true
    updatedAt?: true
  }

  export type UserMinAggregateOutputType = {
    createdAt: Date | null
    email: null | string
    id: null | number
    passwordHash: null | string
    updatedAt: Date | null
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"createdAt" | "email" | "id" | "passwordHash" | "updatedAt", ExtArgs["result"]["user"]>

  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
    createdAt?: boolean
    email?: boolean
    id?: boolean
    passwordHash?: boolean
    responses?: boolean | User$responsesArgs<ExtArgs>
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    email?: boolean
    id?: boolean
    passwordHash?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    createdAt?: boolean
    email?: boolean
    id?: boolean
    passwordHash?: boolean
    updatedAt?: boolean
  }




  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdAt?: boolean
    email?: boolean
    id?: boolean
    passwordHash?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateOutputType = {
    id: null | number
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelectUpdateManyAndReturn<ExtArgs>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: null | UserInclude<ExtArgs>
    /**
     * Omit specific fields from the User
     */
    omit?: null | UserOmit<ExtArgs>
    /**
     * Select specific fields to fetch from the User
     */
    select?: null | UserSelect<ExtArgs>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
  }

  type AnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: AnswerCountAggregateInputType | true
    } & Omit<AnswerFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>
  /**
   * Fields of the Answer model
   */
  interface AnswerFieldRefs {
    readonly id: FieldRef<"Answer", 'Int'>
    readonly questionId: FieldRef<"Answer", 'String'>
    readonly responseId: FieldRef<"Answer", 'Int'>
    readonly value: FieldRef<"Answer", 'Json'>
  }
  type AnswerGetPayload<S extends AnswerDefaultArgs | boolean | null | undefined> = $Result.GetResult<Prisma.$AnswerPayload, S>
  type GetAnswerGroupByPayload<T extends AnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof AnswerGroupByOutputType) & (keyof T))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnswerGroupByOutputType[P]>
            : GetScalarType<T[P], AnswerGroupByOutputType[P]>
        } &
        PickEnumerable<AnswerGroupByOutputType, T['by']>
      >
    >

  type GetMatrixRowGroupByPayload<T extends MatrixRowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof MatrixRowGroupByOutputType) & (keyof T))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatrixRowGroupByOutputType[P]>
            : GetScalarType<T[P], MatrixRowGroupByOutputType[P]>
        } &
        PickEnumerable<MatrixRowGroupByOutputType, T['by']>
      >
    >

  type GetOptionGroupByPayload<T extends OptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof OptionGroupByOutputType) & (keyof T))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OptionGroupByOutputType[P]>
            : GetScalarType<T[P], OptionGroupByOutputType[P]>
        } &
        PickEnumerable<OptionGroupByOutputType, T['by']>
      >
    >

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof QuestionGroupByOutputType) & (keyof T))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        } &
        PickEnumerable<QuestionGroupByOutputType, T['by']>
      >
    >

  type GetResponseGroupByPayload<T extends ResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof ResponseGroupByOutputType) & (keyof T))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResponseGroupByOutputType[P]>
            : GetScalarType<T[P], ResponseGroupByOutputType[P]>
        } &
        PickEnumerable<ResponseGroupByOutputType, T['by']>
      >
    >

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        } &
        PickEnumerable<UserGroupByOutputType, T['by']>
      >
    >




  type MatrixRowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: MatrixRowCountAggregateInputType | true
    } & Omit<MatrixRowFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>
    

  /**
   * Fields of the MatrixRow model
   */
  interface MatrixRowFieldRefs {
    readonly id: FieldRef<"MatrixRow", 'Int'>
    readonly label: FieldRef<"MatrixRow", 'String'>
    readonly order: FieldRef<"MatrixRow", 'Int'>
    readonly questionId: FieldRef<"MatrixRow", 'String'>
  }

  type MatrixRowGetPayload<S extends boolean | MatrixRowDefaultArgs | null | undefined> = $Result.GetResult<Prisma.$MatrixRowPayload, S>

  type OptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: OptionCountAggregateInputType | true
    } & Omit<OptionFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>

  /**
   * Fields of the Option model
   */
  interface OptionFieldRefs {
    readonly id: FieldRef<"Option", 'Int'>
    readonly order: FieldRef<"Option", 'Int'>
    readonly questionId: FieldRef<"Option", 'String'>
    readonly value: FieldRef<"Option", 'String'>
  }

  type OptionGetPayload<S extends boolean | null | OptionDefaultArgs | undefined> = $Result.GetResult<Prisma.$OptionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: QuestionCountAggregateInputType | true
    } & Omit<QuestionFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>

  /**
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly createdAt: FieldRef<"Question", 'DateTime'>
    readonly id: FieldRef<"Question", 'String'>
    readonly step: FieldRef<"Question", 'Int'>
    readonly text: FieldRef<"Question", 'String'>
    readonly type: FieldRef<"Question", 'QuestionType'>
    readonly updatedAt: FieldRef<"Question", 'DateTime'>
  }

  type QuestionGetPayload<S extends boolean | null | QuestionDefaultArgs | undefined> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type ResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: ResponseCountAggregateInputType | true
    } & Omit<ResponseFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>

  /**
   * Fields of the Response model
   */
  interface ResponseFieldRefs {
    readonly id: FieldRef<"Response", 'Int'>
    readonly submittedAt: FieldRef<"Response", 'DateTime'>
    readonly userId: FieldRef<"Response", 'Int'>
  }

  type ResponseGetPayload<S extends boolean | null | ResponseDefaultArgs | undefined> = $Result.GetResult<Prisma.$ResponsePayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      select?: true | UserCountAggregateInputType
    } & Omit<UserFindManyArgs, 'distinct' | 'include' | 'omit' | 'select'>

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly id: FieldRef<"User", 'Int'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogDefinition | LogLevel>): LogLevel | undefined;


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadCommitted: 'ReadCommitted',
    ReadUncommitted: 'ReadUncommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    createdAt: 'createdAt',
    email: 'email',
    id: 'id',
    passwordHash: 'passwordHash',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    createdAt: 'createdAt',
    id: 'id',
    step: 'step',
    text: 'text',
    type: 'type',
    updatedAt: 'updatedAt'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const OptionScalarFieldEnum: {
    id: 'id',
    order: 'order'
    questionId: 'questionId',
    value: 'value',
  };

  export type OptionScalarFieldEnum = (typeof OptionScalarFieldEnum)[keyof typeof OptionScalarFieldEnum]


  export const MatrixRowScalarFieldEnum: {
    id: 'id',
    label: 'label',
    order: 'order'
    questionId: 'questionId',
  };

  export type MatrixRowScalarFieldEnum = (typeof MatrixRowScalarFieldEnum)[keyof typeof MatrixRowScalarFieldEnum]


  export const ResponseScalarFieldEnum: {
    id: 'id',
    submittedAt: 'submittedAt'
    userId: 'userId',
  };

  export type ResponseScalarFieldEnum = (typeof ResponseScalarFieldEnum)[keyof typeof ResponseScalarFieldEnum]


  export const AnswerScalarFieldEnum: {
    id: 'id',
    questionId: 'questionId',
    responseId: 'responseId',
    value: 'value'
  };

  export type AnswerScalarFieldEnum = (typeof AnswerScalarFieldEnum)[keyof typeof AnswerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    AnyNull: typeof AnyNull
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
  };

  export type AnswerAvgOrderByAggregateInput = {
    id?: SortOrder
    responseId?: SortOrder
  }


  /**
   * Field references
   */


  export type AnswerCountOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    responseId?: SortOrder
    value?: SortOrder
  }
    


  export type AnswerCreateInput = {
    question: QuestionCreateNestedOneWithoutAnswersInput
    response: ResponseCreateNestedOneWithoutAnswersInput
    value: InputJsonValue | JsonNullValueInput
  }
    


  export type AnswerCreateManyInput = {
    id?: number
    questionId: string
    responseId: number
    value: InputJsonValue | JsonNullValueInput
  }
    


  export type AnswerCreateManyQuestionInput = {
    id?: number
    responseId: number
    value: InputJsonValue | JsonNullValueInput
  }
    


  export type AnswerCreateManyQuestionInputEnvelope = {
    data: AnswerCreateManyQuestionInput | AnswerCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }
    


  export type AnswerCreateManyResponseInput = {
    id?: number
    questionId: string
    value: InputJsonValue | JsonNullValueInput
  }
    


  export type AnswerCreateManyResponseInputEnvelope = {
    data: AnswerCreateManyResponseInput | AnswerCreateManyResponseInput[]
    skipDuplicates?: boolean
  }
    


  export type AnswerCreateNestedManyWithoutQuestionInput = {
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    create?: AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[] | XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    createMany?: AnswerCreateManyQuestionInputEnvelope
  }
    


  export type AnswerCreateNestedManyWithoutResponseInput = {
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutResponseInput | AnswerCreateOrConnectWithoutResponseInput[]
    create?: AnswerCreateWithoutResponseInput[] | AnswerUncheckedCreateWithoutResponseInput[] | XOR<AnswerCreateWithoutResponseInput, AnswerUncheckedCreateWithoutResponseInput>
    createMany?: AnswerCreateManyResponseInputEnvelope
  }
    


  export type AnswerCreateOrConnectWithoutQuestionInput = {
    create: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    where: AnswerWhereUniqueInput
  }
    


  export type AnswerCreateOrConnectWithoutResponseInput = {
    create: XOR<AnswerCreateWithoutResponseInput, AnswerUncheckedCreateWithoutResponseInput>
    where: AnswerWhereUniqueInput
  }
    


  export type AnswerCreateWithoutQuestionInput = {
    response: ResponseCreateNestedOneWithoutAnswersInput
    value: InputJsonValue | JsonNullValueInput
  }
    
  /**
   * Deep Input Types
   */


  export type AnswerCreateWithoutResponseInput = {
    question: QuestionCreateNestedOneWithoutAnswersInput
    value: InputJsonValue | JsonNullValueInput
  }

  export type AnswerListRelationFilter = {
    every?: AnswerWhereInput
    none?: AnswerWhereInput
    some?: AnswerWhereInput
  }

  export type AnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    responseId?: SortOrder
  }

  export type AnswerMinOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    responseId?: SortOrder
  }

  export type AnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnswerOrderByWithAggregationInput = {
    _avg?: AnswerAvgOrderByAggregateInput
    _count?: AnswerCountOrderByAggregateInput
    _max?: AnswerMaxOrderByAggregateInput
    _min?: AnswerMinOrderByAggregateInput
    _sum?: AnswerSumOrderByAggregateInput
    id?: SortOrder
    questionId?: SortOrder
    responseId?: SortOrder
    value?: SortOrder
  }

  export type AnswerOrderByWithRelationInput = {
    id?: SortOrder
    question?: QuestionOrderByWithRelationInput
    questionId?: SortOrder
    response?: ResponseOrderByWithRelationInput
    responseId?: SortOrder
    value?: SortOrder
  }

  export type AnswerScalarWhereInput = {
    AND?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    id?: IntFilter<"Answer"> | number
    NOT?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    OR?: AnswerScalarWhereInput[]
    questionId?: string | StringFilter<"Answer">
    responseId?: IntFilter<"Answer"> | number
    value?: JsonFilter<"Answer">
  }

  export type AnswerScalarWhereWithAggregatesInput = {
    AND?: AnswerScalarWhereWithAggregatesInput | AnswerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Answer"> | number
    NOT?: AnswerScalarWhereWithAggregatesInput | AnswerScalarWhereWithAggregatesInput[]
    OR?: AnswerScalarWhereWithAggregatesInput[]
    questionId?: string | StringWithAggregatesFilter<"Answer">
    responseId?: IntWithAggregatesFilter<"Answer"> | number
    value?: JsonWithAggregatesFilter<"Answer">
  }

  export type AnswerSumOrderByAggregateInput = {
    id?: SortOrder
    responseId?: SortOrder
  }

  export type AnswerUncheckedCreateInput = {
    id?: number
    questionId: string
    responseId: number
    value: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    create?: AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[] | XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    createMany?: AnswerCreateManyQuestionInputEnvelope
  }

  export type AnswerUncheckedCreateNestedManyWithoutResponseInput = {
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutResponseInput | AnswerCreateOrConnectWithoutResponseInput[]
    create?: AnswerCreateWithoutResponseInput[] | AnswerUncheckedCreateWithoutResponseInput[] | XOR<AnswerCreateWithoutResponseInput, AnswerUncheckedCreateWithoutResponseInput>
    createMany?: AnswerCreateManyResponseInputEnvelope
  }

  export type AnswerUncheckedCreateWithoutQuestionInput = {
    id?: number
    responseId: number
    value: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUncheckedCreateWithoutResponseInput = {
    id?: number
    questionId: string
    value: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    questionId?: string | StringFieldUpdateOperationsInput
    responseId?: IntFieldUpdateOperationsInput | number
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    questionId?: string | StringFieldUpdateOperationsInput
    responseId?: IntFieldUpdateOperationsInput | number
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    responseId?: IntFieldUpdateOperationsInput | number
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    create?: AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[] | XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    createMany?: AnswerCreateManyQuestionInputEnvelope
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutQuestionInput | AnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutQuestionInput | AnswerUpdateManyWithWhereWithoutQuestionInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutQuestionInput | AnswerUpsertWithWhereUniqueWithoutQuestionInput[]
  }

  export type AnswerUncheckedUpdateManyWithoutResponseInput = {
    id?: IntFieldUpdateOperationsInput | number
    questionId?: string | StringFieldUpdateOperationsInput
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUncheckedUpdateManyWithoutResponseNestedInput = {
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutResponseInput | AnswerCreateOrConnectWithoutResponseInput[]
    create?: AnswerCreateWithoutResponseInput[] | AnswerUncheckedCreateWithoutResponseInput[] | XOR<AnswerCreateWithoutResponseInput, AnswerUncheckedCreateWithoutResponseInput>
    createMany?: AnswerCreateManyResponseInputEnvelope
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutResponseInput | AnswerUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutResponseInput | AnswerUpdateManyWithWhereWithoutResponseInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutResponseInput | AnswerUpsertWithWhereUniqueWithoutResponseInput[]
  }

  export type AnswerUncheckedUpdateWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    responseId?: IntFieldUpdateOperationsInput | number
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUncheckedUpdateWithoutResponseInput = {
    id?: IntFieldUpdateOperationsInput | number
    questionId?: string | StringFieldUpdateOperationsInput
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUpdateInput = {
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
    response?: ResponseUpdateOneRequiredWithoutAnswersNestedInput
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUpdateManyMutationInput = {
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUpdateManyWithoutQuestionNestedInput = {
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    create?: AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[] | XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    createMany?: AnswerCreateManyQuestionInputEnvelope
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutQuestionInput | AnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutQuestionInput | AnswerUpdateManyWithWhereWithoutQuestionInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutQuestionInput | AnswerUpsertWithWhereUniqueWithoutQuestionInput[]
  }

  export type AnswerUpdateManyWithoutResponseNestedInput = {
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutResponseInput | AnswerCreateOrConnectWithoutResponseInput[]
    create?: AnswerCreateWithoutResponseInput[] | AnswerUncheckedCreateWithoutResponseInput[] | XOR<AnswerCreateWithoutResponseInput, AnswerUncheckedCreateWithoutResponseInput>
    createMany?: AnswerCreateManyResponseInputEnvelope
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutResponseInput | AnswerUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutResponseInput | AnswerUpdateManyWithWhereWithoutResponseInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutResponseInput | AnswerUpsertWithWhereUniqueWithoutResponseInput[]
  }

  export type AnswerUpdateManyWithWhereWithoutQuestionInput = {
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyWithoutQuestionInput>
    where: AnswerScalarWhereInput
  }

  export type AnswerUpdateManyWithWhereWithoutResponseInput = {
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyWithoutResponseInput>
    where: AnswerScalarWhereInput
  }

  export type AnswerUpdateWithoutQuestionInput = {
    response?: ResponseUpdateOneRequiredWithoutAnswersNestedInput
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUpdateWithoutResponseInput = {
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
    value?: InputJsonValue | JsonNullValueInput
  }

  export type AnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    data: XOR<AnswerUpdateWithoutQuestionInput, AnswerUncheckedUpdateWithoutQuestionInput>
    where: AnswerWhereUniqueInput
  }

  export type AnswerUpdateWithWhereUniqueWithoutResponseInput = {
    data: XOR<AnswerUpdateWithoutResponseInput, AnswerUncheckedUpdateWithoutResponseInput>
    where: AnswerWhereUniqueInput
  }

  export type AnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    create: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    update: XOR<AnswerUpdateWithoutQuestionInput, AnswerUncheckedUpdateWithoutQuestionInput>
    where: AnswerWhereUniqueInput
  }

  export type AnswerUpsertWithWhereUniqueWithoutResponseInput = {
    create: XOR<AnswerCreateWithoutResponseInput, AnswerUncheckedCreateWithoutResponseInput>
    update: XOR<AnswerUpdateWithoutResponseInput, AnswerUncheckedUpdateWithoutResponseInput>
    where: AnswerWhereUniqueInput
  }

  export type AnswerWhereInput = {
    AND?: AnswerWhereInput | AnswerWhereInput[]
    id?: IntFilter<"Answer"> | number
    NOT?: AnswerWhereInput | AnswerWhereInput[]
    OR?: AnswerWhereInput[]
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    questionId?: string | StringFilter<"Answer">
    response?: XOR<ResponseScalarRelationFilter, ResponseWhereInput>
    responseId?: IntFilter<"Answer"> | number
    value?: JsonFilter<"Answer">
  }

  export type AnswerWhereUniqueInput = Prisma.AtLeast<{
    AND?: AnswerWhereInput | AnswerWhereInput[]
    id?: number
    NOT?: AnswerWhereInput | AnswerWhereInput[]
    OR?: AnswerWhereInput[]
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    questionId?: string | StringFilter<"Answer">
    response?: XOR<ResponseScalarRelationFilter, ResponseWhereInput>
    responseId?: IntFilter<"Answer"> | number
    value?: JsonFilter<"Answer">
  }, "id">

  export type BatchPayload = {
    count: number
  }

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeFilter<$PrismaModel> | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeWithAggregatesFilter<$PrismaModel> | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
  }

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>

  /**
   * Reference to a field of type 'QuestionType'
   */
  export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>

  export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType
  }

  export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: $Enums.QuestionType | NestedEnumQuestionTypeFilter<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
  }

  export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: $Enums.QuestionType | NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
  }

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>

  export type IntFieldUpdateOperationsInput = {
    decrement?: number
    divide?: number
    increment?: number
    multiply?: number
    set?: number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: IntFieldRefInput<$PrismaModel> | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntFilter<$PrismaModel> | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | number[]
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: IntFieldRefInput<$PrismaModel> | null | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | null | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntNullableFilter<$PrismaModel> | null | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | null | number[]
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _count?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    equals?: IntFieldRefInput<$PrismaModel> | null | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | null | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | null | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | null | number[]
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    _avg?: NestedFloatFilter<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    equals?: IntFieldRefInput<$PrismaModel> | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | number[]
  }

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>

  export type JsonFilter<$PrismaModel = never> =
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >

  export type JsonFilterBase<$PrismaModel = never> = {
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    mode?: EnumQueryModeFieldRefInput<$PrismaModel> | QueryMode
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
  }

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]

  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    mode?: EnumQueryModeFieldRefInput<$PrismaModel> | QueryMode
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
  }

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>

  /**
   * Reference to a field of type 'QuestionType[]'
   */
  export type ListEnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType[]'>

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>

  export type MatrixRowAvgOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type MatrixRowCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    questionId?: SortOrder
  }

  export type MatrixRowCreateInput = {
    label: string
    order: number
    question: QuestionCreateNestedOneWithoutMatrixRowsInput
  }

  export type MatrixRowCreateManyInput = {
    id?: number
    label: string
    order: number
    questionId: string
  }

  export type MatrixRowCreateManyQuestionInput = {
    id?: number
    label: string
    order: number
  }

  export type MatrixRowCreateManyQuestionInputEnvelope = {
    data: MatrixRowCreateManyQuestionInput | MatrixRowCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type MatrixRowCreateNestedManyWithoutQuestionInput = {
    connect?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    connectOrCreate?: MatrixRowCreateOrConnectWithoutQuestionInput | MatrixRowCreateOrConnectWithoutQuestionInput[]
    create?: MatrixRowCreateWithoutQuestionInput[] | MatrixRowUncheckedCreateWithoutQuestionInput[] | XOR<MatrixRowCreateWithoutQuestionInput, MatrixRowUncheckedCreateWithoutQuestionInput>
    createMany?: MatrixRowCreateManyQuestionInputEnvelope
  }

  export type MatrixRowCreateOrConnectWithoutQuestionInput = {
    create: XOR<MatrixRowCreateWithoutQuestionInput, MatrixRowUncheckedCreateWithoutQuestionInput>
    where: MatrixRowWhereUniqueInput
  }

  export type MatrixRowCreateWithoutQuestionInput = {
    label: string
    order: number
  }

  export type MatrixRowListRelationFilter = {
    every?: MatrixRowWhereInput
    none?: MatrixRowWhereInput
    some?: MatrixRowWhereInput
  }

  export type MatrixRowMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    questionId?: SortOrder
  }

  export type MatrixRowMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    questionId?: SortOrder
  }

  export type MatrixRowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatrixRowOrderByWithAggregationInput = {
    _avg?: MatrixRowAvgOrderByAggregateInput
    _count?: MatrixRowCountOrderByAggregateInput
    _max?: MatrixRowMaxOrderByAggregateInput
    _min?: MatrixRowMinOrderByAggregateInput
    _sum?: MatrixRowSumOrderByAggregateInput
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    questionId?: SortOrder
  }

  export type MatrixRowOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    question?: QuestionOrderByWithRelationInput
    questionId?: SortOrder
  }

  export type MatrixRowScalarWhereInput = {
    AND?: MatrixRowScalarWhereInput | MatrixRowScalarWhereInput[]
    id?: IntFilter<"MatrixRow"> | number
    label?: string | StringFilter<"MatrixRow">
    NOT?: MatrixRowScalarWhereInput | MatrixRowScalarWhereInput[]
    OR?: MatrixRowScalarWhereInput[]
    order?: IntFilter<"MatrixRow"> | number
    questionId?: string | StringFilter<"MatrixRow">
  }

  export type MatrixRowScalarWhereWithAggregatesInput = {
    AND?: MatrixRowScalarWhereWithAggregatesInput | MatrixRowScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MatrixRow"> | number
    label?: string | StringWithAggregatesFilter<"MatrixRow">
    NOT?: MatrixRowScalarWhereWithAggregatesInput | MatrixRowScalarWhereWithAggregatesInput[]
    OR?: MatrixRowScalarWhereWithAggregatesInput[]
    order?: IntWithAggregatesFilter<"MatrixRow"> | number
    questionId?: string | StringWithAggregatesFilter<"MatrixRow">
  }

  export type MatrixRowSumOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type MatrixRowUncheckedCreateInput = {
    id?: number
    label: string
    order: number
    questionId: string
  }

  export type MatrixRowUncheckedCreateNestedManyWithoutQuestionInput = {
    connect?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    connectOrCreate?: MatrixRowCreateOrConnectWithoutQuestionInput | MatrixRowCreateOrConnectWithoutQuestionInput[]
    create?: MatrixRowCreateWithoutQuestionInput[] | MatrixRowUncheckedCreateWithoutQuestionInput[] | XOR<MatrixRowCreateWithoutQuestionInput, MatrixRowUncheckedCreateWithoutQuestionInput>
    createMany?: MatrixRowCreateManyQuestionInputEnvelope
  }

  export type MatrixRowUncheckedCreateWithoutQuestionInput = {
    id?: number
    label: string
    order: number
  }

  export type MatrixRowUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: string | StringFieldUpdateOperationsInput
    order?: IntFieldUpdateOperationsInput | number
    questionId?: string | StringFieldUpdateOperationsInput
  }

  export type MatrixRowUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: string | StringFieldUpdateOperationsInput
    order?: IntFieldUpdateOperationsInput | number
    questionId?: string | StringFieldUpdateOperationsInput
  }

  export type MatrixRowUncheckedUpdateManyWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: string | StringFieldUpdateOperationsInput
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MatrixRowUncheckedUpdateManyWithoutQuestionNestedInput = {
    connect?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    connectOrCreate?: MatrixRowCreateOrConnectWithoutQuestionInput | MatrixRowCreateOrConnectWithoutQuestionInput[]
    create?: MatrixRowCreateWithoutQuestionInput[] | MatrixRowUncheckedCreateWithoutQuestionInput[] | XOR<MatrixRowCreateWithoutQuestionInput, MatrixRowUncheckedCreateWithoutQuestionInput>
    createMany?: MatrixRowCreateManyQuestionInputEnvelope
    delete?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    deleteMany?: MatrixRowScalarWhereInput | MatrixRowScalarWhereInput[]
    disconnect?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    set?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    update?: MatrixRowUpdateWithWhereUniqueWithoutQuestionInput | MatrixRowUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: MatrixRowUpdateManyWithWhereWithoutQuestionInput | MatrixRowUpdateManyWithWhereWithoutQuestionInput[]
    upsert?: MatrixRowUpsertWithWhereUniqueWithoutQuestionInput | MatrixRowUpsertWithWhereUniqueWithoutQuestionInput[]
  }

  export type MatrixRowUncheckedUpdateWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: string | StringFieldUpdateOperationsInput
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MatrixRowUpdateInput = {
    label?: string | StringFieldUpdateOperationsInput
    order?: IntFieldUpdateOperationsInput | number
    question?: QuestionUpdateOneRequiredWithoutMatrixRowsNestedInput
  }

  export type MatrixRowUpdateManyMutationInput = {
    label?: string | StringFieldUpdateOperationsInput
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MatrixRowUpdateManyWithoutQuestionNestedInput = {
    connect?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    connectOrCreate?: MatrixRowCreateOrConnectWithoutQuestionInput | MatrixRowCreateOrConnectWithoutQuestionInput[]
    create?: MatrixRowCreateWithoutQuestionInput[] | MatrixRowUncheckedCreateWithoutQuestionInput[] | XOR<MatrixRowCreateWithoutQuestionInput, MatrixRowUncheckedCreateWithoutQuestionInput>
    createMany?: MatrixRowCreateManyQuestionInputEnvelope
    delete?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    deleteMany?: MatrixRowScalarWhereInput | MatrixRowScalarWhereInput[]
    disconnect?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    set?: MatrixRowWhereUniqueInput | MatrixRowWhereUniqueInput[]
    update?: MatrixRowUpdateWithWhereUniqueWithoutQuestionInput | MatrixRowUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: MatrixRowUpdateManyWithWhereWithoutQuestionInput | MatrixRowUpdateManyWithWhereWithoutQuestionInput[]
    upsert?: MatrixRowUpsertWithWhereUniqueWithoutQuestionInput | MatrixRowUpsertWithWhereUniqueWithoutQuestionInput[]
  }

  export type MatrixRowUpdateManyWithWhereWithoutQuestionInput = {
    data: XOR<MatrixRowUpdateManyMutationInput, MatrixRowUncheckedUpdateManyWithoutQuestionInput>
    where: MatrixRowScalarWhereInput
  }

  export type MatrixRowUpdateWithoutQuestionInput = {
    label?: string | StringFieldUpdateOperationsInput
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MatrixRowUpdateWithWhereUniqueWithoutQuestionInput = {
    data: XOR<MatrixRowUpdateWithoutQuestionInput, MatrixRowUncheckedUpdateWithoutQuestionInput>
    where: MatrixRowWhereUniqueInput
  }

  export type MatrixRowUpsertWithWhereUniqueWithoutQuestionInput = {
    create: XOR<MatrixRowCreateWithoutQuestionInput, MatrixRowUncheckedCreateWithoutQuestionInput>
    update: XOR<MatrixRowUpdateWithoutQuestionInput, MatrixRowUncheckedUpdateWithoutQuestionInput>
    where: MatrixRowWhereUniqueInput
  }

  export type MatrixRowWhereInput = {
    AND?: MatrixRowWhereInput | MatrixRowWhereInput[]
    id?: IntFilter<"MatrixRow"> | number
    label?: string | StringFilter<"MatrixRow">
    NOT?: MatrixRowWhereInput | MatrixRowWhereInput[]
    OR?: MatrixRowWhereInput[]
    order?: IntFilter<"MatrixRow"> | number
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    questionId?: string | StringFilter<"MatrixRow">
  }

  export type MatrixRowWhereUniqueInput = Prisma.AtLeast<{
    AND?: MatrixRowWhereInput | MatrixRowWhereInput[]
    id?: number
    label?: string | StringFilter<"MatrixRow">
    NOT?: MatrixRowWhereInput | MatrixRowWhereInput[]
    OR?: MatrixRowWhereInput[]
    order?: IntFilter<"MatrixRow"> | number
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    questionId?: string | StringFilter<"MatrixRow">
  }, "id">

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeFilter<$PrismaModel> | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    equals?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    gte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    in?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
    lt?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    lte?: Date | DateTimeFieldRefInput<$PrismaModel> | string
    not?: Date | NestedDateTimeWithAggregatesFilter<$PrismaModel> | string
    notIn?: Date[] | ListDateTimeFieldRefInput<$PrismaModel> | string[]
  }

  export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: $Enums.QuestionType | NestedEnumQuestionTypeFilter<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
  }

  export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: $Enums.QuestionType | NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: FloatFieldRefInput<$PrismaModel> | number
    gt?: FloatFieldRefInput<$PrismaModel> | number
    gte?: FloatFieldRefInput<$PrismaModel> | number
    in?: ListFloatFieldRefInput<$PrismaModel> | number[]
    lt?: FloatFieldRefInput<$PrismaModel> | number
    lte?: FloatFieldRefInput<$PrismaModel> | number
    not?: NestedFloatFilter<$PrismaModel> | number
    notIn?: ListFloatFieldRefInput<$PrismaModel> | number[]
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: FloatFieldRefInput<$PrismaModel> | null | number
    gt?: FloatFieldRefInput<$PrismaModel> | number
    gte?: FloatFieldRefInput<$PrismaModel> | number
    in?: ListFloatFieldRefInput<$PrismaModel> | null | number[]
    lt?: FloatFieldRefInput<$PrismaModel> | number
    lte?: FloatFieldRefInput<$PrismaModel> | number
    not?: NestedFloatNullableFilter<$PrismaModel> | null | number
    notIn?: ListFloatFieldRefInput<$PrismaModel> | null | number[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: IntFieldRefInput<$PrismaModel> | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntFilter<$PrismaModel> | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | number[]
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: IntFieldRefInput<$PrismaModel> | null | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | null | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntNullableFilter<$PrismaModel> | null | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | null | number[]
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _count?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    equals?: IntFieldRefInput<$PrismaModel> | null | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | null | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | null | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | null | number[]
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    _avg?: NestedFloatFilter<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    equals?: IntFieldRefInput<$PrismaModel> | number
    gt?: IntFieldRefInput<$PrismaModel> | number
    gte?: IntFieldRefInput<$PrismaModel> | number
    in?: ListIntFieldRefInput<$PrismaModel> | number[]
    lt?: IntFieldRefInput<$PrismaModel> | number
    lte?: IntFieldRefInput<$PrismaModel> | number
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    notIn?: ListIntFieldRefInput<$PrismaModel> | number[]
  }

  export type NestedJsonFilter<$PrismaModel = never> =
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    mode?: EnumQueryModeFieldRefInput<$PrismaModel> | QueryMode
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    contains?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    equals?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    in?: ListStringFieldRefInput<$PrismaModel> | string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | string[]
    startsWith?: string | StringFieldRefInput<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    equals?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    in?: ListStringFieldRefInput<$PrismaModel> | string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | string[]
    startsWith?: string | StringFieldRefInput<$PrismaModel>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    decrement?: number
    divide?: number
    increment?: number
    multiply?: number
    set?: null | number
  }

  export type OptionAvgOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type OptionCountOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    questionId?: SortOrder
    value?: SortOrder
  }

  export type OptionCreateInput = {
    order: number
    question: QuestionCreateNestedOneWithoutOptionsInput
    value: string
  }
  export type OptionCreateManyInput = {
    id?: number
    order: number
    questionId: string
    value: string
  }

  export type OptionCreateManyQuestionInput = {
    id?: number
    order: number
    value: string
  }

  export type OptionCreateManyQuestionInputEnvelope = {
    data: OptionCreateManyQuestionInput | OptionCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type OptionCreateNestedManyWithoutQuestionInput = {
    connect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    connectOrCreate?: OptionCreateOrConnectWithoutQuestionInput | OptionCreateOrConnectWithoutQuestionInput[]
    create?: OptionCreateWithoutQuestionInput[] | OptionUncheckedCreateWithoutQuestionInput[] | XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput>
    createMany?: OptionCreateManyQuestionInputEnvelope
  }

  export type OptionCreateOrConnectWithoutQuestionInput = {
    create: XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput>
    where: OptionWhereUniqueInput
  }

  export type OptionCreateWithoutQuestionInput = {
    order: number
    value: string
  }

  export type OptionListRelationFilter = {
    every?: OptionWhereInput
    none?: OptionWhereInput
    some?: OptionWhereInput
  }

  export type OptionMaxOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    questionId?: SortOrder
    value?: SortOrder
  }
  export type OptionMinOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    questionId?: SortOrder
    value?: SortOrder
  }

  export type OptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OptionOrderByWithAggregationInput = {
    _avg?: OptionAvgOrderByAggregateInput
    _count?: OptionCountOrderByAggregateInput
    _max?: OptionMaxOrderByAggregateInput
    _min?: OptionMinOrderByAggregateInput
    _sum?: OptionSumOrderByAggregateInput
    id?: SortOrder
    order?: SortOrder
    questionId?: SortOrder
    value?: SortOrder
  }

  export type OptionOrderByWithRelationInput = {
    id?: SortOrder
    order?: SortOrder
    question?: QuestionOrderByWithRelationInput
    questionId?: SortOrder
    value?: SortOrder
  }

  export type OptionScalarWhereInput = {
    AND?: OptionScalarWhereInput | OptionScalarWhereInput[]
    id?: IntFilter<"Option"> | number
    NOT?: OptionScalarWhereInput | OptionScalarWhereInput[]
    OR?: OptionScalarWhereInput[]
    order?: IntFilter<"Option"> | number
    questionId?: string | StringFilter<"Option">
    value?: string | StringFilter<"Option">
  }

  export type OptionScalarWhereWithAggregatesInput = {
    AND?: OptionScalarWhereWithAggregatesInput | OptionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Option"> | number
    NOT?: OptionScalarWhereWithAggregatesInput | OptionScalarWhereWithAggregatesInput[]
    OR?: OptionScalarWhereWithAggregatesInput[]
    order?: IntWithAggregatesFilter<"Option"> | number
    questionId?: string | StringWithAggregatesFilter<"Option">
    value?: string | StringWithAggregatesFilter<"Option">
  }

  export type OptionSumOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type OptionUncheckedCreateInput = {
    id?: number
    order: number
    questionId: string
    value: string
  }

  export type OptionUncheckedCreateNestedManyWithoutQuestionInput = {
    connect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    connectOrCreate?: OptionCreateOrConnectWithoutQuestionInput | OptionCreateOrConnectWithoutQuestionInput[]
    create?: OptionCreateWithoutQuestionInput[] | OptionUncheckedCreateWithoutQuestionInput[] | XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput>
    createMany?: OptionCreateManyQuestionInputEnvelope
  }

  export type OptionUncheckedCreateWithoutQuestionInput = {
    id?: number
    order: number
    value: string
  }

  export type OptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    questionId?: string | StringFieldUpdateOperationsInput
    value?: string | StringFieldUpdateOperationsInput
  }

  export type OptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    questionId?: string | StringFieldUpdateOperationsInput
    value?: string | StringFieldUpdateOperationsInput
  }

  export type OptionUncheckedUpdateManyWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    value?: string | StringFieldUpdateOperationsInput
  }

  export type OptionUncheckedUpdateManyWithoutQuestionNestedInput = {
    connect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    connectOrCreate?: OptionCreateOrConnectWithoutQuestionInput | OptionCreateOrConnectWithoutQuestionInput[]
    create?: OptionCreateWithoutQuestionInput[] | OptionUncheckedCreateWithoutQuestionInput[] | XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput>
    createMany?: OptionCreateManyQuestionInputEnvelope
    delete?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    deleteMany?: OptionScalarWhereInput | OptionScalarWhereInput[]
    disconnect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    set?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    update?: OptionUpdateWithWhereUniqueWithoutQuestionInput | OptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: OptionUpdateManyWithWhereWithoutQuestionInput | OptionUpdateManyWithWhereWithoutQuestionInput[]
    upsert?: OptionUpsertWithWhereUniqueWithoutQuestionInput | OptionUpsertWithWhereUniqueWithoutQuestionInput[]
  }

  export type OptionUncheckedUpdateWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    value?: string | StringFieldUpdateOperationsInput
  }

  export type OptionUpdateInput = {
    order?: IntFieldUpdateOperationsInput | number
    question?: QuestionUpdateOneRequiredWithoutOptionsNestedInput
    value?: string | StringFieldUpdateOperationsInput
  }

  export type OptionUpdateManyMutationInput = {
    order?: IntFieldUpdateOperationsInput | number
    value?: string | StringFieldUpdateOperationsInput
  }

  export type OptionUpdateManyWithoutQuestionNestedInput = {
    connect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    connectOrCreate?: OptionCreateOrConnectWithoutQuestionInput | OptionCreateOrConnectWithoutQuestionInput[]
    create?: OptionCreateWithoutQuestionInput[] | OptionUncheckedCreateWithoutQuestionInput[] | XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput>
    createMany?: OptionCreateManyQuestionInputEnvelope
    delete?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    deleteMany?: OptionScalarWhereInput | OptionScalarWhereInput[]
    disconnect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    set?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    update?: OptionUpdateWithWhereUniqueWithoutQuestionInput | OptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: OptionUpdateManyWithWhereWithoutQuestionInput | OptionUpdateManyWithWhereWithoutQuestionInput[]
    upsert?: OptionUpsertWithWhereUniqueWithoutQuestionInput | OptionUpsertWithWhereUniqueWithoutQuestionInput[]
  }

  export type OptionUpdateManyWithWhereWithoutQuestionInput = {
    data: XOR<OptionUpdateManyMutationInput, OptionUncheckedUpdateManyWithoutQuestionInput>
    where: OptionScalarWhereInput
  }

  export type OptionUpdateWithoutQuestionInput = {
    order?: IntFieldUpdateOperationsInput | number
    value?: string | StringFieldUpdateOperationsInput
  }

  export type OptionUpdateWithWhereUniqueWithoutQuestionInput = {
    data: XOR<OptionUpdateWithoutQuestionInput, OptionUncheckedUpdateWithoutQuestionInput>
    where: OptionWhereUniqueInput
  }

  export type OptionUpsertWithWhereUniqueWithoutQuestionInput = {
    create: XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput>
    update: XOR<OptionUpdateWithoutQuestionInput, OptionUncheckedUpdateWithoutQuestionInput>
    where: OptionWhereUniqueInput
  }

  export type OptionWhereInput = {
    AND?: OptionWhereInput | OptionWhereInput[]
    id?: IntFilter<"Option"> | number
    NOT?: OptionWhereInput | OptionWhereInput[]
    OR?: OptionWhereInput[]
    order?: IntFilter<"Option"> | number
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    questionId?: string | StringFilter<"Option">
    value?: string | StringFilter<"Option">
  }

  export type OptionWhereUniqueInput = Prisma.AtLeast<{
    AND?: OptionWhereInput | OptionWhereInput[]
    id?: number
    NOT?: OptionWhereInput | OptionWhereInput[]
    OR?: OptionWhereInput[]
    order?: IntFilter<"Option"> | number
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    questionId?: string | StringFilter<"Option">
    value?: string | StringFilter<"Option">
  }, "id">

  export type QuestionAvgOrderByAggregateInput = {
    step?: SortOrder
  }

  export type QuestionCountOrderByAggregateInput = {
    createdAt?: SortOrder
    id?: SortOrder
    step?: SortOrder
    text?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionCreateInput = {
    answers?: AnswerCreateNestedManyWithoutQuestionInput
    createdAt?: Date | string
    id: string
    matrixRows?: MatrixRowCreateNestedManyWithoutQuestionInput
    options?: OptionCreateNestedManyWithoutQuestionInput
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionCreateManyInput = {
    createdAt?: Date | string
    id: string
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionCreateNestedOneWithoutAnswersInput = {
    connect?: QuestionWhereUniqueInput
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
  }

  export type QuestionCreateNestedOneWithoutMatrixRowsInput = {
    connect?: QuestionWhereUniqueInput
    connectOrCreate?: QuestionCreateOrConnectWithoutMatrixRowsInput
    create?: XOR<QuestionCreateWithoutMatrixRowsInput, QuestionUncheckedCreateWithoutMatrixRowsInput>
  }

  export type QuestionCreateNestedOneWithoutOptionsInput = {
    connect?: QuestionWhereUniqueInput
    connectOrCreate?: QuestionCreateOrConnectWithoutOptionsInput
    create?: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
  }

  export type QuestionCreateOrConnectWithoutAnswersInput = {
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    where: QuestionWhereUniqueInput
  }

  export type QuestionCreateOrConnectWithoutMatrixRowsInput = {
    create: XOR<QuestionCreateWithoutMatrixRowsInput, QuestionUncheckedCreateWithoutMatrixRowsInput>
    where: QuestionWhereUniqueInput
  }

  export type QuestionCreateOrConnectWithoutOptionsInput = {
    create: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    where: QuestionWhereUniqueInput
  }

  export type QuestionCreateWithoutAnswersInput = {
    createdAt?: Date | string
    id: string
    matrixRows?: MatrixRowCreateNestedManyWithoutQuestionInput
    options?: OptionCreateNestedManyWithoutQuestionInput
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionCreateWithoutMatrixRowsInput = {
    answers?: AnswerCreateNestedManyWithoutQuestionInput
    createdAt?: Date | string
    id: string
    options?: OptionCreateNestedManyWithoutQuestionInput
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionCreateWithoutOptionsInput = {
    answers?: AnswerCreateNestedManyWithoutQuestionInput
    createdAt?: Date | string
    id: string
    matrixRows?: MatrixRowCreateNestedManyWithoutQuestionInput
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionMaxOrderByAggregateInput = {
    createdAt?: SortOrder
    id?: SortOrder
    step?: SortOrder
    text?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    createdAt?: SortOrder
    id?: SortOrder
    step?: SortOrder
    text?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionOrderByWithAggregationInput = {
    _avg?: QuestionAvgOrderByAggregateInput
    _count?: QuestionCountOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
    createdAt?: SortOrder
    id?: SortOrder
    step?: SortOrder
    text?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionOrderByWithRelationInput = {
    answers?: AnswerOrderByRelationAggregateInput
    createdAt?: SortOrder
    id?: SortOrder
    matrixRows?: MatrixRowOrderByRelationAggregateInput
    options?: OptionOrderByRelationAggregateInput
    step?: SortOrder
    text?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionScalarRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    createdAt?: Date | DateTimeWithAggregatesFilter<"Question"> | string
    id?: string | StringWithAggregatesFilter<"Question">
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    step?: IntWithAggregatesFilter<"Question"> | number
    text?: string | StringWithAggregatesFilter<"Question">
    type?: $Enums.QuestionType | EnumQuestionTypeWithAggregatesFilter<"Question">
    updatedAt?: Date | DateTimeWithAggregatesFilter<"Question"> | string
  }

  export type QuestionSumOrderByAggregateInput = {
    step?: SortOrder
  }

  export type QuestionUncheckedCreateInput = {
    answers?: AnswerUncheckedCreateNestedManyWithoutQuestionInput
    createdAt?: Date | string
    id: string
    matrixRows?: MatrixRowUncheckedCreateNestedManyWithoutQuestionInput
    options?: OptionUncheckedCreateNestedManyWithoutQuestionInput
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionUncheckedCreateWithoutAnswersInput = {
    createdAt?: Date | string
    id: string
    matrixRows?: MatrixRowUncheckedCreateNestedManyWithoutQuestionInput
    options?: OptionUncheckedCreateNestedManyWithoutQuestionInput
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionUncheckedCreateWithoutMatrixRowsInput = {
    answers?: AnswerUncheckedCreateNestedManyWithoutQuestionInput
    createdAt?: Date | string
    id: string
    options?: OptionUncheckedCreateNestedManyWithoutQuestionInput
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionUncheckedCreateWithoutOptionsInput = {
    answers?: AnswerUncheckedCreateNestedManyWithoutQuestionInput
    createdAt?: Date | string
    id: string
    matrixRows?: MatrixRowUncheckedCreateNestedManyWithoutQuestionInput
    step: number
    text: string
    type: $Enums.QuestionType
    updatedAt?: Date | string
  }

  export type QuestionUncheckedUpdateInput = {
    answers?: AnswerUncheckedUpdateManyWithoutQuestionNestedInput
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    matrixRows?: MatrixRowUncheckedUpdateManyWithoutQuestionNestedInput
    options?: OptionUncheckedUpdateManyWithoutQuestionNestedInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }
  export type QuestionUncheckedUpdateManyInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUncheckedUpdateWithoutAnswersInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    matrixRows?: MatrixRowUncheckedUpdateManyWithoutQuestionNestedInput
    options?: OptionUncheckedUpdateManyWithoutQuestionNestedInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUncheckedUpdateWithoutMatrixRowsInput = {
    answers?: AnswerUncheckedUpdateManyWithoutQuestionNestedInput
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    options?: OptionUncheckedUpdateManyWithoutQuestionNestedInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUncheckedUpdateWithoutOptionsInput = {
    answers?: AnswerUncheckedUpdateManyWithoutQuestionNestedInput
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    matrixRows?: MatrixRowUncheckedUpdateManyWithoutQuestionNestedInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUpdateInput = {
    answers?: AnswerUpdateManyWithoutQuestionNestedInput
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    matrixRows?: MatrixRowUpdateManyWithoutQuestionNestedInput
    options?: OptionUpdateManyWithoutQuestionNestedInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUpdateManyMutationInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    connect?: QuestionWhereUniqueInput
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutAnswersInput, QuestionUpdateWithoutAnswersInput>, QuestionUncheckedUpdateWithoutAnswersInput>
    upsert?: QuestionUpsertWithoutAnswersInput
  }

  export type QuestionUpdateOneRequiredWithoutMatrixRowsNestedInput = {
    connect?: QuestionWhereUniqueInput
    connectOrCreate?: QuestionCreateOrConnectWithoutMatrixRowsInput
    create?: XOR<QuestionCreateWithoutMatrixRowsInput, QuestionUncheckedCreateWithoutMatrixRowsInput>
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutMatrixRowsInput, QuestionUpdateWithoutMatrixRowsInput>, QuestionUncheckedUpdateWithoutMatrixRowsInput>
    upsert?: QuestionUpsertWithoutMatrixRowsInput
  }

  export type QuestionUpdateOneRequiredWithoutOptionsNestedInput = {
    connect?: QuestionWhereUniqueInput
    connectOrCreate?: QuestionCreateOrConnectWithoutOptionsInput
    create?: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutOptionsInput, QuestionUpdateWithoutOptionsInput>, QuestionUncheckedUpdateWithoutOptionsInput>
    upsert?: QuestionUpsertWithoutOptionsInput
  }

  export type QuestionUpdateToOneWithWhereWithoutAnswersInput = {
    data: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutMatrixRowsInput = {
    data: XOR<QuestionUpdateWithoutMatrixRowsInput, QuestionUncheckedUpdateWithoutMatrixRowsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutOptionsInput = {
    data: XOR<QuestionUpdateWithoutOptionsInput, QuestionUncheckedUpdateWithoutOptionsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateWithoutAnswersInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    matrixRows?: MatrixRowUpdateManyWithoutQuestionNestedInput
    options?: OptionUpdateManyWithoutQuestionNestedInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUpdateWithoutMatrixRowsInput = {
    answers?: AnswerUpdateManyWithoutQuestionNestedInput
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    options?: OptionUpdateManyWithoutQuestionNestedInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUpdateWithoutOptionsInput = {
    answers?: AnswerUpdateManyWithoutQuestionNestedInput
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    id?: string | StringFieldUpdateOperationsInput
    matrixRows?: MatrixRowUpdateManyWithoutQuestionNestedInput
    step?: IntFieldUpdateOperationsInput | number
    text?: string | StringFieldUpdateOperationsInput
    type?: $Enums.QuestionType | EnumQuestionTypeFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type QuestionUpsertWithoutAnswersInput = {
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    update: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpsertWithoutMatrixRowsInput = {
    create: XOR<QuestionCreateWithoutMatrixRowsInput, QuestionUncheckedCreateWithoutMatrixRowsInput>
    update: XOR<QuestionUpdateWithoutMatrixRowsInput, QuestionUncheckedUpdateWithoutMatrixRowsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpsertWithoutOptionsInput = {
    create: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    update: XOR<QuestionUpdateWithoutOptionsInput, QuestionUncheckedUpdateWithoutOptionsInput>
    where?: QuestionWhereInput
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    answers?: AnswerListRelationFilter
    createdAt?: Date | DateTimeFilter<"Question"> | string
    id?: string | StringFilter<"Question">
    matrixRows?: MatrixRowListRelationFilter
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    options?: OptionListRelationFilter
    OR?: QuestionWhereInput[]
    step?: IntFilter<"Question"> | number
    text?: string | StringFilter<"Question">
    type?: $Enums.QuestionType | EnumQuestionTypeFilter<"Question">
    updatedAt?: Date | DateTimeFilter<"Question"> | string
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    AND?: QuestionWhereInput | QuestionWhereInput[]
    answers?: AnswerListRelationFilter
    createdAt?: Date | DateTimeFilter<"Question"> | string
    id?: string
    matrixRows?: MatrixRowListRelationFilter
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    options?: OptionListRelationFilter
    OR?: QuestionWhereInput[]
    step?: IntFilter<"Question"> | number
    text?: string | StringFilter<"Question">
    type?: $Enums.QuestionType | EnumQuestionTypeFilter<"Question">
    updatedAt?: Date | DateTimeFilter<"Question"> | string
  }, "id">

  export type ResponseAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ResponseCountOrderByAggregateInput = {
    id?: SortOrder
    submittedAt?: SortOrder
    userId?: SortOrder
  }

  export type ResponseCreateInput = {
    answers?: AnswerCreateNestedManyWithoutResponseInput
    submittedAt?: Date | string
    user?: UserCreateNestedOneWithoutResponsesInput
  }

  export type ResponseCreateManyInput = {
    id?: number
    submittedAt?: Date | string
    userId?: null | number
  }

  export type ResponseCreateManyUserInput = {
    id?: number
    submittedAt?: Date | string
  }

  export type ResponseCreateManyUserInputEnvelope = {
    data: ResponseCreateManyUserInput | ResponseCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResponseCreateNestedManyWithoutUserInput = {
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutUserInput | ResponseCreateOrConnectWithoutUserInput[]
    create?: ResponseCreateWithoutUserInput[] | ResponseUncheckedCreateWithoutUserInput[] | XOR<ResponseCreateWithoutUserInput, ResponseUncheckedCreateWithoutUserInput>
    createMany?: ResponseCreateManyUserInputEnvelope
  }

  export type ResponseCreateNestedOneWithoutAnswersInput = {
    connect?: ResponseWhereUniqueInput
    connectOrCreate?: ResponseCreateOrConnectWithoutAnswersInput
    create?: XOR<ResponseCreateWithoutAnswersInput, ResponseUncheckedCreateWithoutAnswersInput>
  }

  export type ResponseCreateOrConnectWithoutAnswersInput = {
    create: XOR<ResponseCreateWithoutAnswersInput, ResponseUncheckedCreateWithoutAnswersInput>
    where: ResponseWhereUniqueInput
  }

  export type ResponseCreateOrConnectWithoutUserInput = {
    create: XOR<ResponseCreateWithoutUserInput, ResponseUncheckedCreateWithoutUserInput>
    where: ResponseWhereUniqueInput
  }

  export type ResponseCreateWithoutAnswersInput = {
    submittedAt?: Date | string
    user?: UserCreateNestedOneWithoutResponsesInput
  }

  export type ResponseCreateWithoutUserInput = {
    answers?: AnswerCreateNestedManyWithoutResponseInput
    submittedAt?: Date | string
  }

  export type ResponseListRelationFilter = {
    every?: ResponseWhereInput
    none?: ResponseWhereInput
    some?: ResponseWhereInput
  }

  export type ResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    submittedAt?: SortOrder
    userId?: SortOrder
  }

  export type ResponseMinOrderByAggregateInput = {
    id?: SortOrder
    submittedAt?: SortOrder
    userId?: SortOrder
  }

  export type ResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResponseOrderByWithAggregationInput = {
    _avg?: ResponseAvgOrderByAggregateInput
    _count?: ResponseCountOrderByAggregateInput
    _max?: ResponseMaxOrderByAggregateInput
    _min?: ResponseMinOrderByAggregateInput
    _sum?: ResponseSumOrderByAggregateInput
    id?: SortOrder
    submittedAt?: SortOrder
    userId?: SortOrder | SortOrderInput
  }

  export type ResponseOrderByWithRelationInput = {
    answers?: AnswerOrderByRelationAggregateInput
    id?: SortOrder
    submittedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder | SortOrderInput
  }

  export type ResponseScalarRelationFilter = {
    is?: ResponseWhereInput
    isNot?: ResponseWhereInput
  }

  export type ResponseScalarWhereInput = {
    AND?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    id?: IntFilter<"Response"> | number
    NOT?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    OR?: ResponseScalarWhereInput[]
    submittedAt?: Date | DateTimeFilter<"Response"> | string
    userId?: IntNullableFilter<"Response"> | null | number
  }

  export type ResponseScalarWhereWithAggregatesInput = {
    AND?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Response"> | number
    NOT?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    OR?: ResponseScalarWhereWithAggregatesInput[]
    submittedAt?: Date | DateTimeWithAggregatesFilter<"Response"> | string
    userId?: IntNullableWithAggregatesFilter<"Response"> | null | number
  }

  export type ResponseSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ResponseUncheckedCreateInput = {
    answers?: AnswerUncheckedCreateNestedManyWithoutResponseInput
    id?: number
    submittedAt?: Date | string
    userId?: null | number
  }

  export type ResponseUncheckedCreateNestedManyWithoutUserInput = {
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutUserInput | ResponseCreateOrConnectWithoutUserInput[]
    create?: ResponseCreateWithoutUserInput[] | ResponseUncheckedCreateWithoutUserInput[] | XOR<ResponseCreateWithoutUserInput, ResponseUncheckedCreateWithoutUserInput>
    createMany?: ResponseCreateManyUserInputEnvelope
  }

  export type ResponseUncheckedCreateWithoutAnswersInput = {
    id?: number
    submittedAt?: Date | string
    userId?: null | number
  }

  export type ResponseUncheckedCreateWithoutUserInput = {
    answers?: AnswerUncheckedCreateNestedManyWithoutResponseInput
    id?: number
    submittedAt?: Date | string
  }

  export type ResponseUncheckedUpdateInput = {
    answers?: AnswerUncheckedUpdateManyWithoutResponseNestedInput
    id?: IntFieldUpdateOperationsInput | number
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
    userId?: null | NullableIntFieldUpdateOperationsInput | number
  }

  export type ResponseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
    userId?: null | NullableIntFieldUpdateOperationsInput | number
  }

  export type ResponseUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type ResponseUncheckedUpdateManyWithoutUserNestedInput = {
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutUserInput | ResponseCreateOrConnectWithoutUserInput[]
    create?: ResponseCreateWithoutUserInput[] | ResponseUncheckedCreateWithoutUserInput[] | XOR<ResponseCreateWithoutUserInput, ResponseUncheckedCreateWithoutUserInput>
    createMany?: ResponseCreateManyUserInputEnvelope
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutUserInput | ResponseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutUserInput | ResponseUpdateManyWithWhereWithoutUserInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutUserInput | ResponseUpsertWithWhereUniqueWithoutUserInput[]
  }

  export type ResponseUncheckedUpdateWithoutAnswersInput = {
    id?: IntFieldUpdateOperationsInput | number
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
    userId?: null | NullableIntFieldUpdateOperationsInput | number
  }

  export type ResponseUncheckedUpdateWithoutUserInput = {
    answers?: AnswerUncheckedUpdateManyWithoutResponseNestedInput
    id?: IntFieldUpdateOperationsInput | number
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type ResponseUpdateInput = {
    answers?: AnswerUpdateManyWithoutResponseNestedInput
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutResponsesNestedInput
  }

  export type ResponseUpdateManyMutationInput = {
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type ResponseUpdateManyWithoutUserNestedInput = {
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutUserInput | ResponseCreateOrConnectWithoutUserInput[]
    create?: ResponseCreateWithoutUserInput[] | ResponseUncheckedCreateWithoutUserInput[] | XOR<ResponseCreateWithoutUserInput, ResponseUncheckedCreateWithoutUserInput>
    createMany?: ResponseCreateManyUserInputEnvelope
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutUserInput | ResponseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutUserInput | ResponseUpdateManyWithWhereWithoutUserInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutUserInput | ResponseUpsertWithWhereUniqueWithoutUserInput[]
  }

  export type ResponseUpdateManyWithWhereWithoutUserInput = {
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyWithoutUserInput>
    where: ResponseScalarWhereInput
  }

  export type ResponseUpdateOneRequiredWithoutAnswersNestedInput = {
    connect?: ResponseWhereUniqueInput
    connectOrCreate?: ResponseCreateOrConnectWithoutAnswersInput
    create?: XOR<ResponseCreateWithoutAnswersInput, ResponseUncheckedCreateWithoutAnswersInput>
    update?: XOR<XOR<ResponseUpdateToOneWithWhereWithoutAnswersInput, ResponseUpdateWithoutAnswersInput>, ResponseUncheckedUpdateWithoutAnswersInput>
    upsert?: ResponseUpsertWithoutAnswersInput
  }

  export type ResponseUpdateToOneWithWhereWithoutAnswersInput = {
    data: XOR<ResponseUpdateWithoutAnswersInput, ResponseUncheckedUpdateWithoutAnswersInput>
    where?: ResponseWhereInput
  }

  export type ResponseUpdateWithoutAnswersInput = {
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutResponsesNestedInput
  }

  export type ResponseUpdateWithoutUserInput = {
    answers?: AnswerUpdateManyWithoutResponseNestedInput
    submittedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type ResponseUpdateWithWhereUniqueWithoutUserInput = {
    data: XOR<ResponseUpdateWithoutUserInput, ResponseUncheckedUpdateWithoutUserInput>
    where: ResponseWhereUniqueInput
  }

  export type ResponseUpsertWithoutAnswersInput = {
    create: XOR<ResponseCreateWithoutAnswersInput, ResponseUncheckedCreateWithoutAnswersInput>
    update: XOR<ResponseUpdateWithoutAnswersInput, ResponseUncheckedUpdateWithoutAnswersInput>
    where?: ResponseWhereInput
  }

  export type ResponseUpsertWithWhereUniqueWithoutUserInput = {
    create: XOR<ResponseCreateWithoutUserInput, ResponseUncheckedCreateWithoutUserInput>
    update: XOR<ResponseUpdateWithoutUserInput, ResponseUncheckedUpdateWithoutUserInput>
    where: ResponseWhereUniqueInput
  }

  export type ResponseWhereInput = {
    AND?: ResponseWhereInput | ResponseWhereInput[]
    answers?: AnswerListRelationFilter
    id?: IntFilter<"Response"> | number
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    submittedAt?: Date | DateTimeFilter<"Response"> | string
    user?: null | XOR<UserNullableScalarRelationFilter, UserWhereInput>
    userId?: IntNullableFilter<"Response"> | null | number
  }

  export type ResponseWhereUniqueInput = Prisma.AtLeast<{
    AND?: ResponseWhereInput | ResponseWhereInput[]
    answers?: AnswerListRelationFilter
    id?: number
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    submittedAt?: Date | DateTimeFilter<"Response"> | string
    user?: null | XOR<UserNullableScalarRelationFilter, UserWhereInput>
    userId?: IntNullableFilter<"Response"> | null | number
  }, "id">

  export type SortOrderInput = {
    nulls?: NullsOrder
    sort: SortOrder
  }

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type StringFilter<$PrismaModel = never> = {
    contains?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    equals?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    in?: ListStringFieldRefInput<$PrismaModel> | string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | string[]
    startsWith?: string | StringFieldRefInput<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    _count?: NestedIntFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    equals?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    in?: ListStringFieldRefInput<$PrismaModel> | string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    notIn?: ListStringFieldRefInput<$PrismaModel> | string[]
    startsWith?: string | StringFieldRefInput<$PrismaModel>
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    createdAt?: SortOrder
    email?: SortOrder
    id?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCreateInput = {
    createdAt?: Date | string
    email: string
    passwordHash: string
    responses?: ResponseCreateNestedManyWithoutUserInput
    updatedAt?: Date | string
  }

  export type UserCreateManyInput = {
    createdAt?: Date | string
    email: string
    id?: number
    passwordHash: string
    updatedAt?: Date | string
  }

  export type UserCreateNestedOneWithoutResponsesInput = {
    connect?: UserWhereUniqueInput
    connectOrCreate?: UserCreateOrConnectWithoutResponsesInput
    create?: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
  }

  export type UserCreateOrConnectWithoutResponsesInput = {
    create: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    where: UserWhereUniqueInput
  }

  export type UserCreateWithoutResponsesInput = {
    createdAt?: Date | string
    email: string
    passwordHash: string
    updatedAt?: Date | string
  }

  export type UserMaxOrderByAggregateInput = {
    createdAt?: SortOrder
    email?: SortOrder
    id?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    createdAt?: SortOrder
    email?: SortOrder
    id?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: null | UserWhereInput
    isNot?: null | UserWhereInput
  }

  export type UserOrderByWithAggregationInput = {
    _avg?: UserAvgOrderByAggregateInput
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
    createdAt?: SortOrder
    email?: SortOrder
    id?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserOrderByWithRelationInput = {
    createdAt?: SortOrder
    email?: SortOrder
    id?: SortOrder
    passwordHash?: SortOrder
    responses?: ResponseOrderByRelationAggregateInput
    updatedAt?: SortOrder
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    createdAt?: Date | DateTimeWithAggregatesFilter<"User"> | string
    email?: string | StringWithAggregatesFilter<"User">
    id?: IntWithAggregatesFilter<"User"> | number
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    passwordHash?: string | StringWithAggregatesFilter<"User">
    updatedAt?: Date | DateTimeWithAggregatesFilter<"User"> | string
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserUncheckedCreateInput = {
    createdAt?: Date | string
    email: string
    id?: number
    passwordHash: string
    responses?: ResponseUncheckedCreateNestedManyWithoutUserInput
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutResponsesInput = {
    createdAt?: Date | string
    email: string
    id?: number
    passwordHash: string
    updatedAt?: Date | string
  }

  export type UserUncheckedUpdateInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: string | StringFieldUpdateOperationsInput
    id?: IntFieldUpdateOperationsInput | number
    passwordHash?: string | StringFieldUpdateOperationsInput
    responses?: ResponseUncheckedUpdateManyWithoutUserNestedInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: string | StringFieldUpdateOperationsInput
    id?: IntFieldUpdateOperationsInput | number
    passwordHash?: string | StringFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutResponsesInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: string | StringFieldUpdateOperationsInput
    id?: IntFieldUpdateOperationsInput | number
    passwordHash?: string | StringFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type UserUpdateInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: string | StringFieldUpdateOperationsInput
    passwordHash?: string | StringFieldUpdateOperationsInput
    responses?: ResponseUpdateManyWithoutUserNestedInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type UserUpdateManyMutationInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: string | StringFieldUpdateOperationsInput
    passwordHash?: string | StringFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type UserUpdateOneWithoutResponsesNestedInput = {
    connect?: UserWhereUniqueInput
    connectOrCreate?: UserCreateOrConnectWithoutResponsesInput
    create?: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    delete?: boolean | UserWhereInput
    disconnect?: boolean | UserWhereInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResponsesInput, UserUpdateWithoutResponsesInput>, UserUncheckedUpdateWithoutResponsesInput>
    upsert?: UserUpsertWithoutResponsesInput
  }

  export type UserUpdateToOneWithWhereWithoutResponsesInput = {
    data: XOR<UserUpdateWithoutResponsesInput, UserUncheckedUpdateWithoutResponsesInput>
    where?: UserWhereInput
  }

  export type UserUpdateWithoutResponsesInput = {
    createdAt?: Date | DateTimeFieldUpdateOperationsInput | string
    email?: string | StringFieldUpdateOperationsInput
    passwordHash?: string | StringFieldUpdateOperationsInput
    updatedAt?: Date | DateTimeFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutResponsesInput = {
    create: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    update: XOR<UserUpdateWithoutResponsesInput, UserUncheckedUpdateWithoutResponsesInput>
    where?: UserWhereInput
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    createdAt?: Date | DateTimeFilter<"User"> | string
    email?: string | StringFilter<"User">
    id?: IntFilter<"User"> | number
    NOT?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    passwordHash?: string | StringFilter<"User">
    responses?: ResponseListRelationFilter
    updatedAt?: Date | DateTimeFilter<"User"> | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    AND?: UserWhereInput | UserWhereInput[]
    createdAt?: Date | DateTimeFilter<"User"> | string
    email?: string
    id?: number
    NOT?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    passwordHash?: string | StringFilter<"User">
    responses?: ResponseListRelationFilter
    updatedAt?: Date | DateTimeFilter<"User"> | string
  }, "email" | "id">

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}