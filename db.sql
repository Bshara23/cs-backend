PGDMP         6                y            pcshop    13.1    13.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16535    pcshop    DATABASE     Q   CREATE DATABASE pcshop WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE pcshop;
                postgres    false            �            1259    16541 	   promocode    TABLE     e   CREATE TABLE public.promocode (
    id bigint NOT NULL,
    promo_code text,
    description text
);
    DROP TABLE public.promocode;
       public         heap    postgres    false            �            1259    16539    promocode_id_seq    SEQUENCE     �   CREATE SEQUENCE public.promocode_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 '   DROP SEQUENCE public.promocode_id_seq;
       public          postgres    false    201            �           0    0    promocode_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.promocode_id_seq OWNED BY public.promocode.id;
          public          postgres    false    200            �            1259    16548    users    TABLE     4  CREATE TABLE public.users (
    id bigint NOT NULL,
    name text NOT NULL,
    family_name text NOT NULL,
    email text,
    promo_code text,
    country text,
    city text,
    street text,
    zip_code text,
    password text,
    spare1 text,
    spare2 text,
    spare3 integer,
    spare4 integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            1           2604    16544    promocode id    DEFAULT     l   ALTER TABLE ONLY public.promocode ALTER COLUMN id SET DEFAULT nextval('public.promocode_id_seq'::regclass);
 ;   ALTER TABLE public.promocode ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    16541 	   promocode 
   TABLE DATA           @   COPY public.promocode (id, promo_code, description) FROM stdin;
    public          postgres    false    201   %       �          0    16548    users 
   TABLE DATA           �   COPY public.users (id, name, family_name, email, promo_code, country, city, street, zip_code, password, spare1, spare2, spare3, spare4) FROM stdin;
    public          postgres    false    202   Z       �           0    0    promocode_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.promocode_id_seq', 4, true);
          public          postgres    false    200            3           2606    16555    users Users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT "Users_pkey";
       public            postgres    false    202            �   %   x�3��".#(mhd̙����	ds��qqq �T      �      x����n�0Eg�c����2tH3��ЖT�Hl����G;(�(E$�{xA$"e_K'�%u'���B����w��#�������+�M��������h��5�ny e5�&C�0;$�c[7��&��ئG�k[w��䵶Gi҂��~��H��z,x��' �,1[ ?�T� �f��/�(C�}ik�"�f�"�K�K9V�K/���9c�R>y�]vBN��EƓv��ٰ��������N)�D�$     