import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cart = {
  __typename?: 'Cart';
  product: Product;
  productId: Scalars['Float'];
  qty: Scalars['Int'];
  user: User;
  userId: Scalars['Float'];
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  items?: Maybe<Array<Cart>>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCart: Cart;
  changePassword: ChangePasswordResponse;
  createProduct: Product;
  forgetPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  resetPassword: UserResponse;
};


export type MutationAddCartArgs = {
  productId: Scalars['Int'];
  qty: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  countInStock: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type ProductInput = {
  countInStock: Scalars['Int'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getCart: Array<Cart>;
  me?: Maybe<MeResponse>;
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  items: Cart;
  lastname: Scalars['String'];
  product: Product;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, firstname: string, email: string, isAdmin: boolean };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, firstname: string, email: string, isAdmin: boolean } | null };

export type AddCartMutationVariables = Exact<{
  productId: Scalars['Int'];
  qty: Scalars['Int'];
}>;


export type AddCartMutation = { __typename?: 'Mutation', addCart: { __typename?: 'Cart', userId: number, productId: number, qty: number } };

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgetPasswordMutation = { __typename?: 'Mutation', forgetPassword: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, firstname: string, email: string, isAdmin: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, firstname: string, email: string, isAdmin: boolean } | null } };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, firstname: string, email: string, isAdmin: boolean } | null } };

export type GetCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartQuery = { __typename?: 'Query', getCart: Array<{ __typename?: 'Cart', qty: number, product: { __typename?: 'Product', id: number, name: string, price: number, countInStock: number } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'MeResponse', user?: { __typename?: 'User', id: number, firstname: string, email: string, isAdmin: boolean } | null, items?: Array<{ __typename?: 'Cart', productId: number }> | null } | null };

export type ProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: number, name: string, price: number, description: string, countInStock: number, imageUrl: string } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, price: number, description: string, countInStock: number, imageUrl: string }> };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  firstname
  email
  isAdmin
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AddCartDocument = gql`
    mutation AddCart($productId: Int!, $qty: Int!) {
  addCart(productId: $productId, qty: $qty) {
    userId
    productId
    qty
  }
}
    `;

export function useAddCartMutation() {
  return Urql.useMutation<AddCartMutation, AddCartMutationVariables>(AddCartDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $newPassword: String!) {
  changePassword(password: $password, newPassword: $newPassword) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgetPasswordDocument = gql`
    mutation ForgetPassword($email: String!) {
  forgetPassword(email: $email)
}
    `;

export function useForgetPasswordMutation() {
  return Urql.useMutation<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $token: String!) {
  resetPassword(newPassword: $newPassword, token: $token) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const GetCartDocument = gql`
    query GetCart {
  getCart {
    product {
      id
      name
      price
      countInStock
    }
    qty
  }
}
    `;

export function useGetCartQuery(options?: Omit<Urql.UseQueryArgs<GetCartQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCartQuery>({ query: GetCartDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    user {
      ...RegularUser
    }
    items {
      productId
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProductDocument = gql`
    query Product($id: Int!) {
  product(id: $id) {
    id
    name
    price
    description
    countInStock
    imageUrl
  }
}
    `;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    price
    description
    countInStock
    imageUrl
  }
}
    `;

export function useProductsQuery(options?: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};