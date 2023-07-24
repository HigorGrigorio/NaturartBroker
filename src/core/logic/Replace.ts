/**
 * This raplace a key value into object.
 * @example
 * ```typescript
 * interface User {
 *  name: String
 *  cpf: CPF
 * }
 *
 * Replace<User, {cpf: String}>
 * ```
 * The object becomes:
 * ```typescript
 * {
 *  name: String
 *  cpf: String
 * }
 * ```
 *
 *
 */
export type Replace<T, R> = Omit<T, keyof R> & R;
